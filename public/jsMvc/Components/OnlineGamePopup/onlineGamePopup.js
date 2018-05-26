/**
 *  @module components/OnlineGamePopup
 */

import template from './onlineGamePopup.tmpl.xml';
import {fill} from '../../Modules/filling.js';
/**
 * Popup class to show pop-up block in case of win
 */
class OnlineGamePopup {
    /**
     * Create a pop-up
     */
    constructor() {
        this.fest = template;
    }

    /**
     * A method that specifies the place to render pop-up
     * @param root - place to render pop-up
     * @return {OnlineGamePopup} current class instance.
     */
    renderTo(root) {
        this.el = document.createElement('div');
        root.appendChild(this.el);
        return this;
    }

    /**
     * Render pop-up
     * @param {object} params - description of the fields needed by the fest.
     * @return {OnlineGamePopup} current class instance.
     */
    render(params) {
        this.params = params;
        this.el.innerHTML = this.fest(this.params);
        this.init();
        const image = this.el.getElementsByClassName('js-opponent-image')[0];
        const login = this.el.getElementsByClassName('js-opponent-login')[0];
        this.timerId = setInterval(() => {
            image.style.background = fill.getRandomColor();
            login.innerHTML = fill.getRandomName();
        }, 3000);
        const tipsEl = this.el.getElementsByClassName('js-rules')[0];
        this.tipsTimer = setInterval(() => tipsEl.innerHTML = fill.getRandomTips(), 6000);

        this.close = document.getElementsByClassName('js-continue')[0];
        if (this.close) {
            clearInterval(this.timerId);
            clearInterval(this.tipsTimer);
            const row = document.getElementsByClassName('js-row')[0];
            row.hidden = true;
            this.close.addEventListener('click', evt => {
                evt.preventDefault();
                evt.stopPropagation();
                this.el.remove();
                row.hidden = false;
            });
        }

        const continueGame = document.getElementsByClassName('js-continue-game')[0];
        if (continueGame) {
            clearInterval(this.timerId);
            clearInterval(this.tipsTimer);
            continueGame.addEventListener('click', evt => {
                evt.preventDefault();
                evt.stopPropagation();
                this.gameRestart();
            }, {once: true});
        }
        //TODO exit in menu
        //
        // document.addEventListener('keydown', evt => {
        //     if (evt.keyCode === 27) {
        //         this.remove();
        //     }
        // });
        //
        // document.addEventListener('click', evt => {
        //     const substrate = evt.target;
        //     if (substrate.className.indexOf('js-substrate') !== -1) {
        //         this.remove();
        //     }
        // });

        return this;
    }

    /**
     * Add handlers
     */
    init() {
        this.form = this.el.getElementsByClassName('js-popup-form')[0];
    }

    /**
     * remove popup and clear all timers
     */
    remove() {
        clearInterval(this.timerId);
        clearInterval(this.tipsTimer);
        this.el.remove();
        this.el = null;
    }
}

export {OnlineGamePopup};