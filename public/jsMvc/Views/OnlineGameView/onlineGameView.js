import {ViewInterface} from '../ViewInterface.js';
import {GamePopup} from '../../Components/GamePopup/gamePopup.js';
import template from './onlineGameView.tmpl.xml';
import {Cell} from '../../Components/Cell/cell.js';
import {sharedData} from '../../Modules/sharedData.js';
import {bus} from '../../Modules/bus.js';
import debounce from '../../Modules/debounce.js';

class OnlineGameView extends ViewInterface {
    constructor() {
        super(template);
        this.popup = new GamePopup();
    }


    startGame(params) {
        this.params = params;
        this.setOppenent(this.params.opponent);
        this.drawField();
        window.addEventListener('resize', debounce(() => {
            const free = this.params.map.pool;
            const sizeCell = Cell.findSizeCell(this.elementUnfixed, this.params.map.countX, this.params.map.countY, this.elementFixed, free.length);
            this.params.map.cells.forEach((v, i) => Cell.setPropertyFixed(this.cell[i], this.elementUnfixed, v, sizeCell, this.params.map.countX, this.params.map.countY));
            free.forEach((v, i) => (this.colourFree[i].isBottom) ? Cell.resizeFree(this.colourFree[i], this.elementFixed, v.colour, sizeCell, i, free.length) : Cell.resizeCell(this.colourFree[i], this.elementUnfixed, v, sizeCell, this.params.map.countX, this.params.map.countY, i, free.length, this.elementFixed));
        }, 200));

        document.ontouchstart = evt => this.onStartEvent(evt);
        document.onmousedown = evt => this.onStartEvent(evt);
    }

    render(params = {}) {
        bus.emit('removeLines');
        super.render(params);
        this.startGame({
            map: {
                countX: 3,
                countY: 1,
                cells: [
                    {
                        x: 0,
                        y: 0,
                        colour: '#730d13'
                    },
                    {
                        x: 1,
                        y: 0
                    },
                    {
                        x: 2,
                        y: 0,
                        colour: '#dcd3e0'
                    }
                ],
                pool: [
                    {
                        colour: '#f05a69'
                    }
                ]
            },
            opponent: {
                nickname: 'Warprobot228',
                image: 'no_avatar.png'
            }
        });
        return this;
    }

    drawFree(sizeCell) {
        this.colourFree = [];
        this.params.map.pool.forEach((v, i, all) => {
            this.colourFree[i] = document.createElement('div');
            Cell.setPropertyFree(this.colourFree[i], this.elementFixed, v.colour, sizeCell, i, all.length);
            this.elementFixed.appendChild(this.colourFree[i]);
        });
    }

    drawUnfixed(sizeCell) {
        this.cell = [];
        this.params.map.cells.forEach((v, i) => {
            this.cell[i] = document.createElement('div');
            v.fixed = !(v.colour);
            Cell.setPropertyFixed(this.cell[i], this.elementUnfixed, v, sizeCell, this.params.map.countX, this.params.map.countY);
            this.elementUnfixed.appendChild(this.cell[i]);
        });
    }

    drawField() {
        this.elementUnfixed = this.el.getElementsByClassName('js-game-unfixed')[0];
        this.elementFixed = this.el.getElementsByClassName('js-game-fixed')[0];
        const sizeCell = Cell.findSizeCell(this.elementUnfixed, this.params.map.countX, this.params.map.countY, this.elementFixed, this.params.map.pool.length);
        this.drawUnfixed(sizeCell);
        this.drawFree(sizeCell);
    }

    setOppenent(params) {
        const me = document.getElementsByClassName('js-me')[0];
        const opponent  = document.getElementsByClassName('js-opponent')[0];

        const myName = me.getElementsByClassName('js-name')[0];
        const myImage = me.getElementsByClassName('js-image')[0];
        this.myScore = me.getElementsByClassName('js-rating')[0];

        myName.innerHTML = sharedData.data.currentUser.login;
        myImage.src = sharedData.data.currentUser.image;
        this.myScore.innerHTML = '0';

        const opponentName = opponent.getElementsByClassName('js-name')[0];
        const opponentImage = opponent.getElementsByClassName('js-image')[0];
        this.opponentScore = opponent.getElementsByClassName('js-rating')[0];

        opponentName.innerHTML = params.nickname;
        opponentImage.src = params.image;
        this.opponentScore.innerHTML = '0';
        return this;
    }

    onStartEvent(evt) {
        const cell = evt.target;

        if ((cell.className.indexOf('js-fixed') === -1) || cell.fixedCubic) return;

        const allocated = document.getElementsByClassName('js-empty-cell');
        [...allocated].forEach(v => v.style.opacity = '0.8');

        const X = (evt.pageX)? evt.pageX : evt.targetTouches[0].pageX;
        const Y = (evt.pageY)? evt.pageY : evt.targetTouches[0].pageY;

        const shiftX = X - cell.getBoundingClientRect().left;
        const shiftY = Y - cell.getBoundingClientRect().top;
        this.elementUnfixed.appendChild(cell);

        document.onmousemove = evt => this.onMoveEvent(evt, cell, shiftX, shiftY);
        document.ontouchmove = evt => this.onMoveEvent(evt, cell, shiftX, shiftY);
        cell.onmouseup = () => this.onUpEvent(cell, allocated);
        cell.ontouchend = () => this.onUpEvent(cell, allocated);
        cell.ondragstart = () => false;
    }

    /**
     * this method do some magic with current cell in touchmove or mousemove event
     * @param evt(Event) - event (touchmove || mousemove)
     * @param cell - current cell
     * @param shiftX(number) - shift on X relatively to center of cell
     * @param shiftY(number) - shift on Y relatively to center of cell
     */
    onMoveEvent(evt, cell, shiftX, shiftY) {
        const X = (evt.pageX)? evt.pageX : evt.targetTouches[0].pageX;
        const Y = (evt.pageY)? evt.pageY : evt.targetTouches[0].pageY;
        cell.hidden = true;
        const bottomElement = document.elementFromPoint(X, Y);
        if (bottomElement) {
            cell.canDrag = (bottomElement.className.indexOf('js-empty-cell') !== -1);
            cell.hidden = false;
            Cell.putOnPosition(cell, `${X - shiftX}px`, `${Y - shiftY}px`);
            if (cell.canDrag) {
                [cell.currentY, cell.currentX] = [getComputedStyle(bottomElement).top, getComputedStyle(bottomElement).left];
                [cell.x, cell.y] = [bottomElement.x, bottomElement.y];
                bottomElement.classList.add('game-blendocu__empty-cell-hover');
                bottomElement.addEventListener('transitionend', () => bottomElement.classList.remove('game-blendocu__empty-cell-hover'), false);
            }
        }
    }

    /**
     * this method do some magic with current cell in touchend or mouseup event
     * @param cell - current cell
     * @param allocated(HTMLCollection) - array of empty cell to change opacity
     */
    onUpEvent(cell, allocated) {
        [...allocated].forEach(v => v.style.opacity = '0.4');
        document.onmousemove = null;
        cell.onmouseup = null;
        if (!cell.canDrag) {
            Cell.putOnPosition(cell, cell.wrongX, cell.wrongY);
            cell.isBottom = true;
        } else {
            this.onSetCubic({x: cell.x, y: cell.y, colour: cell.colour});
            this.lastSettetCubic = cell;
        }
    }

    cubicSet(payload) {
        this.myScore.innerHTML = `${payload.your}`;
        this.opponentScore.innerHTML = `${payload.opponent}`;

        const cell = this.colourFree.filter(v => v.colour === payload.colour)[0];
        if (cell.length !== 0) {
            Cell.putOnPosition(cell, cell.currentX, cell.currentY);
            [cell.isBottom, cell.fixedCubic] = [false, true];
            [cell.bottomX, cell.bottomY] = [cell.x, cell.y];
        } else {
            Cell.putOnPosition(this.lastSettetCubic, this.lastSettetCubic.wrongX, this.lastSettetCubic.wrongY);
            this.lastSettetCubic.isBottom = true;
        }
    }

    cubicDrop(payload) {
        this.myScore.innerHTML = `${payload.your}`;
        this.opponentScore.innerHTML = `${payload.opponent}`;

        const cell = this.colourFree.filter(v => v.colour === payload.colour)[0];
        if (cell.length !== 0) {
            Cell.putOnPosition(cell, cell.wrongX, cell.wrongY);
            [cell.bottomX, cell.bottomY] = [cell.x, cell.y];
        } //else {
        //     Cell.putOnPosition(this.lastSettetCubic, this.lastSettetCubic.wrongX, this.lastSettetCubic.wrongY);
        //     this.lastSettetCubic.isBottom = true;
        // }
    }

}

export {OnlineGameView};