/**
 * @module views/gameView
 */


import {ViewInterface} from '../ViewInterface.js';
import {Cell} from '../../Components/Cell/cell.js';
import {GamePopup} from '../../Components/GamePopup/gamePopup.js';
import template from './gameView.tmpl.xml';

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
        const free = this.params.cells.filter(v => v.fixed);
        free.forEach((v, i) => {
            const colourFree = document.createElement('div');
            Cell.setPropertyFree(colourFree, this.elementFixed, v.colour, sizeCell, i, free.length);
            this.elementFixed.appendChild(colourFree);
        });
    }

    /**
     * Render field with empty and fill blocks
     * @param {Number} sizeCell - size of one block
     */
    drawUnfixed(sizeCell) {
        this.params.cells.forEach(v => {
            const cell = document.createElement('div');
            Cell.setPropertyFixed(cell, this.elementUnfixed, v, sizeCell, this.params.countX, this.params.countY);
            this.elementUnfixed.appendChild(cell);
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
        window.requestAnimationFrame(this.timer.bind(this));


        document.ontouchstart = evt => {
            this.onStartEvent(evt);
        };


        document.onmousedown = evt => {
            this.onStartEvent(evt);
        };
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
            this.animation = window.requestAnimationFrame(this.timer.bind(this));
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
        setTimeout(this.addPopupWin.bind(this), 2000, this.finalStars);
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
        const allocated = document.getElementsByClassName('game-blendocu__empty-cell');
        const cell = evt.target;
        if (cell.className.indexOf('js-fixed') === -1) return;

        [...allocated].forEach(v => v.style.opacity = '0.8');
        const X = (evt.pageX)? evt.pageX : evt.targetTouches[0].pageX;
        const Y = (evt.pageY)? evt.pageY : evt.targetTouches[0].pageY;

        const shiftX = X - cell.getBoundingClientRect().left + pageXOffset;
        const shiftY = Y - cell.getBoundingClientRect().top + pageYOffset;

        this.elementUnfixed.appendChild(cell);

        document.onmousemove = evt => {
            this.onMoveEvent(evt, cell, shiftX, shiftY);
        };
        document.ontouchmove = evt => {
            this.onMoveEvent(evt, cell, shiftX, shiftY);
        };

        cell.onmouseup = () => {
            this.onUpEvent(cell, allocated);
        };
        cell.ontouchend = () => {
            this.onUpEvent(cell, allocated);
        };
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
            (bottomElement.className.indexOf('js-empty-cell') !== -1) ? cell.canDrag = true : cell.canDrag = false;
            cell.hidden = false;
            Cell.putOnPosition(cell, `${X - shiftX}px`, `${Y - shiftY}px`);
            if (cell.canDrag) {
                cell.currentY = getComputedStyle(bottomElement).top;
                cell.currentX = getComputedStyle(bottomElement).left;
                cell.x = bottomElement.x;
                cell.y = bottomElement.y;
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
        if (!cell.canDrag) {
            Cell.putOnPosition(cell, cell.wrongX, cell.wrongY);
        } else {
            Cell.putOnPosition(cell, cell.currentX, cell.currentY);
            this.setCubic({x: cell.x, y: cell.y, colour: cell.colour});
        }
    }

}

export {GameView};
