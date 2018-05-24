import {ViewInterface} from '../ViewInterface.js';
import {OnlineGamePopup} from '../../Components/OnlineGamePopup/onlineGamePopup.js';
import template from './onlineGameView.tmpl.xml';
import {Cell} from '../../Components/Cell/cell.js';
import {sharedData} from '../../Modules/sharedData.js';
import {bus} from '../../Modules/bus.js';
import debounce from '../../Modules/debounce.js';
import {baseUrl} from '../../Modules/HttpModule.js';

class OnlineGameView extends ViewInterface {
    constructor() {
        super(template);
        this.popup = new OnlineGamePopup();
    }

    startGame(params) {
        this.canRemove = new Set();
        this.popup.remove();
        this.params = params;
        const score = document.getElementsByClassName('online-game__score')[0];
        score.style.display = 'flex';
        this.setOpponent(this.params.opponent);
        this.drawField();
        window.addEventListener('resize', debounce(() => {
            const free = this.params.map.pool;
            const sizeCell = Cell.findSizeCell(this.elementMap, this.params.map.countX, this.params.map.countY, this.elementPool, free.length);
            this.params.map.cells.forEach((v, i) => Cell.setFixedProperty(this.cell[i], this.elementMap, v, sizeCell, this.params.map.countX, this.params.map.countY));
            free.forEach((v, i) => (this.colourPool[i].isBottom) ? Cell.resizePool(this.colourPool[i], this.elementPool, v.colour, sizeCell, i, free.length) : Cell.resizeMap(this.colourPool[i], this.elementMap, v, sizeCell, this.params.map.countX, this.params.map.countY, i, free.length, this.elementPool));
            this.borderPool.forEach(v => Cell.resizeBorderProperty(v));
        }, 200));

        document.ontouchstart = evt => this.onStartEvent(evt);
        document.onmousedown = evt => this.onStartEvent(evt);

        const row = document.getElementsByClassName('js-row')[0];
        row.addEventListener('click', evt => {
            evt.preventDefault();
            evt.stopPropagation();
            const popupExit = new OnlineGamePopup();
            const popupEl = this.el.getElementsByClassName('wrapper-block__game-blendocu')[0];
            if (popupEl) {
                popupExit.renderTo(popupEl);
                popupExit.render({type: 'exit'});
            }
        });
    }

    render(params = {}) {
        bus.emit('removeLines');
        super.render(params);
        this.onReady();
        const popupEl = this.el.getElementsByClassName('wrapper-block__game-blendocu')[0];
        if (popupEl) {
            this.popup.renderTo(popupEl);
            this.popup.render({type: 'loader', login: sharedData.data.currentUser.login, image: sharedData.data.currentUser.image});
        }
        return this;
    }

    destroy() {
        super.destroy();
        this.onClose();
        return this;
    }

    /**
     * Draw cubic pool.
     * @param {number} sizeCell - The cubic length.
     */
    drawPool(sizeCell) {
        this.colourPool = [];
        this.borderPool = [];
        this.params.map.pool.forEach((v, i, all) => {
            this.colourPool[i] = document.createElement('div');
            Cell.setPoolProperty(this.colourPool[i], this.elementPool, v.colour, sizeCell, i, all.length);
            this.borderPool[i] = document.createElement('div');
            Cell.setBorderProperty(this.borderPool[i], this.colourPool[i]);
            this.elementPool.appendChild(this.borderPool[i]);
            this.elementPool.appendChild(this.colourPool[i]);
        });
    }

    /**
     * Draw cubic map.
     * @param {number} sizeCell - The cubic length.
     */
    drawMap(sizeCell) {
        this.cell = [];
        this.params.map.cells.forEach((v, i) => {
            this.cell[i] = document.createElement('div');
            v.fixed = !!(v.colour);
            Cell.setFixedProperty(this.cell[i], this.elementMap, v, sizeCell, this.params.map.countX, this.params.map.countY);
            this.elementMap.appendChild(this.cell[i]);
        });
    }

    /**
     * Draw all (map + pool).
     */
    drawField() {
        this.elementMap = this.el.getElementsByClassName('js-game-map')[0];
        this.elementPool = this.el.getElementsByClassName('js-game-pool')[0];
        const sizeCell = Cell.findSizeCell(this.elementMap, this.params.map.countX, this.params.map.countY, this.elementPool, this.params.map.pool.length);
        this.drawMap(sizeCell);
        this.drawPool(sizeCell);
    }

    setOpponent(params) {
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

        opponentName.innerHTML = params.login;
        opponentImage.src = `${baseUrl}/files/${params.image}`;
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
        this.elementMap.appendChild(cell);
        cell.borderElement.style.borderColor = 'var(--baseColor)';

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
        if (cell.fixedCubic === true) {
            return;
        }
        const X = (evt.pageX)? evt.pageX : evt.targetTouches[0].pageX;
        const Y = (evt.pageY)? evt.pageY : evt.targetTouches[0].pageY;
        cell.hidden = true;
        const bottomElement = document.elementFromPoint(X, Y);
        if (bottomElement) {
            cell.canDrag = (bottomElement.className.indexOf('js-empty-cell') !== -1);
            cell.hidden = false;
            Cell.putOnPosition(cell, `${X - shiftX}px`, `${Y - shiftY}px`);

            if (this.canRemove.size) {
                this.canRemove.forEach(v => v.style.borderColor = 'var(--inputColor)');
                this.canRemove.clear();
            }
            if (cell.canDrag) {
                [cell.currentY, cell.currentX] = [getComputedStyle(bottomElement).top, getComputedStyle(bottomElement).left];
                [cell.x, cell.y] = [bottomElement.x, bottomElement.y];
                bottomElement.style.borderColor = 'var(--baseColor)';
                bottomElement.addEventListener('transitionend', () => this.canRemove.add(bottomElement), {once: true});
                cell.borderElement.style.borderColor = 'transparent';
            } else {
                cell.borderElement.style.borderColor = 'var(--baseColor)';
            }
        }
    }

    /**
     * this method do some magic with current cell in touchend or mouseup event
     * @param cell - current cell
     * @param allocated(HTMLCollection) - array of empty cell to change opacity
     */
    onUpEvent(cell, allocated) {
        [...allocated].forEach(v => {
            v.style.opacity = '0.4';
            v.style.borderColor = 'var(--inputColor)';
        });
        document.onmousemove = null;
        cell.onmouseup = null;
        if (!cell.canDrag) {
            Cell.putOnPosition(cell, cell.wrongX, cell.wrongY);
            cell.isBottom = true;
            return;
        }
        this.onSetCubic({x: cell.x, y: cell.y, colour: cell.colour});
        this.lastSettedCubic = cell;

    }

    cubicSet(payload) {
        const increment = document.createElement('div');
        increment.classList.add('online-game__increment-score');
        increment.innerHTML = '+1';
        increment.style.left = (payload.youSet) ? `${this.myScore.offsetLeft}px` : `${this.opponentScore.offsetLeft}px`;
        increment.addEventListener('animationend', increment.remove);
        this.el.appendChild(increment);

        setTimeout(() => {
            this.myScore.innerHTML = `${payload.your}`;
            this.opponentScore.innerHTML = `${payload.opponent}`;
        }, 300);


        const cell = this.colourPool.filter(v => v.colour === payload.colour)[0];
        const position = this.cell.filter(v => v.x === payload.x && v.y === payload.y)[0];

        if (!cell) {
            Cell.putOnPosition(this.lastSettedCubic, this.lastSettedCubic.wrongX, this.lastSettedCubic.wrongY);
            this.lastSettedCubic.isBottom = true;
            return;
        }
        Cell.putOnPosition(cell, position.style.left, position.style.top);
        [cell.isBottom, cell.fixedCubic] = [false, true];
        [cell.bottomX, cell.bottomY] = [payload.x, payload.y];

        cell.borderElement.style.borderColor = 'transparent';

        if (this.canRemove.size) {
            this.canRemove.forEach(v => v.style.borderColor = 'var(--inputColor)');
            this.canRemove.clear();
        }
    }

    cubicDrop(payload) {
        const cell = this.colourPool.filter(v => v.colour === payload.colour)[0];
        if (cell) {
            if (cell.fixedCubic === true) {
                return;
            }
            Cell.putOnPosition(cell, cell.wrongX, cell.wrongY);
            [cell.bottomX, cell.bottomY] = [cell.x, cell.y];
        }
        if (this.canRemove.resize) {
            this.canRemove.forEach(v => v.style.borderColor = 'var(--inputColor)');
            this.canRemove.clear();
        }
    }

    gameEnd(payload) {
        const cells = document.getElementsByClassName('game-blendocu__cell');
        [...cells].forEach(v => v.classList.add('game-blendocu__cell--win'));
        const popupWin = new OnlineGamePopup();
        const popupEl = this.el.getElementsByClassName('wrapper-block__game-blendocu')[0];
        popupWin.gameRestart = () => this.gameRestart();
        setTimeout(() => {
            if (popupEl) {
                const row = this.el.getElementsByClassName('js-row')[0];
                row.remove();
                popupWin.renderTo(popupEl);
                popupWin.render({type: 'win', your: payload.your, opponent: payload.opponent, result: payload.result, reason: payload.reason});
            }
        }, 1000);
    }


    isAllowed() {
        return !!sharedData.data.currentUser;
    }

    gameRestart() {
        this.destroy();
        this.render();
    }


}

export {OnlineGameView};