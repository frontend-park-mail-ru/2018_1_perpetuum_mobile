/**
 * @module views/gameView
 */


import {ViewInterface} from '../ViewInterface.js';
import {Cell} from '../../Components/Cell/cell.js';
import {GamePopup} from '../../Components/GamePopup/gamePopup.js';
import template from './gameView.tmpl.xml';
import debounce from '../../Modules/debounce.js';

/**
 * Game view
 * @extends ViewInterface
 */
class GameView extends ViewInterface {
    /**
     * Create a GameView instance.
     */
    constructor() {
        super(template);
        this._popup = new GamePopup();
    }

    /**
     * Render the view.
     * @param {object} params - The object with info provided to fest.
     * @return {GameView} The current object instance.
     */
    render(params = {}) {

        if (!Object.keys(params).length && params.constructor === Object) {
            this.openLevel();
            return this;
        }

        if (!params['cells']) {
            this.openLevel({page: +params.urlParams[0]});
            return this;
        }

        super.render(params);
        this.init();
        this.params = params;
        this.drawField();
        return this;
    }

    /**
     * Render free blocks on field
     * @param {Number} sizeCell - size of one block
     */
    drawFree(sizeCell) {
        this.colourFree = [];
        const free = this.params.cells.filter(v => v.fixed);
        free.forEach((v, i) => {
            this.colourFree[i] = document.createElement('div');
            Cell.setPropertyFree(this.colourFree[i], this.elementFixed, v.colour, sizeCell, i, free.length);
            this.elementFixed.appendChild(this.colourFree[i]);
        });
    }

    /**
     * Render field with empty and fill blocks
     * @param {Number} sizeCell - size of one block
     */
    drawUnfixed(sizeCell) {
        this.cell = [];
        this.params.cells.forEach((v, i) => {
            this.cell[i] = document.createElement('div');
            Cell.setPropertyFixed(this.cell[i], this.elementUnfixed, v, sizeCell, this.params.countX, this.params.countY);
            this.elementUnfixed.appendChild(this.cell[i]);
        });
    }

    /**
     * Render all game scene
     */
    drawField() {
        this.elementUnfixed = this.el.getElementsByClassName('js-game-unfixed')[0];
        this.elementFixed = this.el.getElementsByClassName('js-game-fixed')[0];
        const count = this.params.cells.filter(v => v.fixed).length;
        const sizeCell = Cell.findSizeCell(this.elementUnfixed, this.params.countX, this.params.countY, this.elementFixed, count);
        this.drawUnfixed(sizeCell);
        this.drawFree(sizeCell);
    }

    /**
     * Add handlers for drag and drop
     * add animation of timer
     */
    init() {
        this.finalStars = 3;
        this.rating = this.el.getElementsByClassName('js-rating')[0];
        this.star = [];
        for (let i = 0; i < 3; i++) {
            this.star[i] = document.createElement('span');
            this.star[i].classList.add('rating__one-star', 'rating__one-star-good');
            this.star[i].innerHTML = '☆';
            this.rating.appendChild(this.star[i]);
        }

        this.startTimeSec = new Date().getTime();

        window.requestAnimationFrame(() => this.timer());

        document.ontouchstart = evt => this.onStartEvent(evt);
        document.onmousedown = evt => this.onStartEvent(evt);

        window.addEventListener('resize', debounce(() => {
            console.log('wkekk');
            const free = this.params.cells.filter(v => v.fixed);
            const sizeCell = Cell.findSizeCell(this.elementUnfixed, this.params.countX, this.params.countY, this.elementFixed, free.length);
            this.params.cells.forEach((v, i) => Cell.setPropertyFixed(this.cell[i], this.elementUnfixed, v, sizeCell, this.params.countX, this.params.countY));
            free.forEach((v, i) => (this.colourFree[i].isBottom) ? Cell.resizeFree(this.colourFree[i], this.elementFixed, v.colour, sizeCell, i, free.length) : Cell.resizeCell(this.colourFree[i], this.elementUnfixed, v, sizeCell, this.params.countX, this.params.countY, i, free.length, this.elementFixed));
        }, 200));
    }

    /**
     * add popup with time in case of win
     */
    addPopupWin() {
        const popupEl = this.el.getElementsByClassName('wrapper-block__game-blendocu')[0];
        if (popupEl) {
            this._popup.renderTo(popupEl);
            this._popup.render({numStars: this.finalStars, time: ` ${~~(this.timeNowSec/1000)}`, toNextLevel: this.params.toNextLevel});
        }
    }

    /**
     * callback for requesAnimationFrame
     * rerender timer on game scene
     */
    timer() {
        const time = this.el.getElementsByClassName('js-timer')[0];

        if (!!time && !!this.rating) {
            this.timeNowSec = new Date().getTime() - this.startTimeSec;

            if (~~(this.timeNowSec/1000) > this.params.stars3) {
                this.star[2].classList.remove('rating__one-star-good');
                this.finalStars = 2;
            }
            if (~~(this.timeNowSec/1000) > this.params.stars2) {
                this.star[1].classList.remove('rating__one-star-good');
                this.finalStars = 1;
            }
            time.innerHTML = `${~~(this.timeNowSec/1000)}`;
            this.animation = window.requestAnimationFrame(() => this.timer());
        }
    }

    /**
     * callback for model in case of win
     */
    gameOnWin() {
        const score = document.getElementsByClassName('js-score')[0];
        const cells = document.getElementsByClassName('game-blendocu__cell');
        [...cells].forEach(v => v.classList.add('game-blendocu__cell--win'));
        window.cancelAnimationFrame(this.animation);
        setTimeout(() => this.addPopupWin(this.finalStars), 2000);
        setTimeout(() => score.innerHTML = '', 2000);
    }

    /**
     *
     * @returns {GameView} - The current object instance.
     */
    destroy() {
        this.el.innerHTML = '';
        return this;
    }

    /**
     * this method do some magic with current cell in touchstart or mousedown event
     * @param evt - event (touchstart || mousedown)
     */
    onStartEvent(evt) {
        const cell = evt.target;

        if (cell.className.indexOf('js-fixed') === -1) return;

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
            Cell.putOnPosition(cell, cell.currentX, cell.currentY);
            cell.isBottom = false;
            [cell.bottomX, cell.bottomY] = [cell.x, cell.y];
            this.setCubic({x: cell.x, y: cell.y, colour: cell.colour});
        }
    }
}

export {GameView};
