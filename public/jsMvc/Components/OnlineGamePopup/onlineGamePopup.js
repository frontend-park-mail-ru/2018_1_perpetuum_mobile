/**
 *  @module components/OnlineGamePopup
 */

import template from './OnlineGamePopup.tmpl.xml';
/**
 * Popup class to show pop-up block in case of win
 */
class OnlineGamePopup {
    /**
     * Create a pop-up
     */
    constructor() {
        this.el = document.createElement('div');
        this.fest = template;
    }

    /**
     * return random number
     * @param max {number} - random limit
     * @returns {number} - random number
     */
    random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**
     * A method that specifies the place to render pop-up
     * @param root - place to render pop-up
     * @return {OnlineGamePopup} current class instance.
     */
    renderTo(root) {
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
        const name = ['Bird', 'Book', 'Cell', 'Cat'];
        const adjectively = ['Magic', 'Beauty', '', 'Best'];
        const tips = ['Put all the cubes in the gradient', 'Study, eat, JS', 'Learn JS', 'Walk the dog, wife and child'];
        this.timerId = setInterval(() => {
            const r = this.random(0,255);
            const g = this.random(0,255);
            const b = this.random(0,255);
            image.style.background = `rgb(${r}, ${g}, ${b})`;
            login.innerHTML = `${adjectively[this.random(0,adjectively.length)]}${name[this.random(0,name.length)]}${this.random(1, 99)}`;
        }, 2000);
        const tipsEl = this.el.getElementsByClassName('js-rules')[0];
        this.tipsTimer = setInterval(() => {
            tipsEl.innerHTML = tips[this.random(0, tips.length)];
        }, 6000);
        return this;
    }

    /**
     * Add handlers
     */
    init() {
        this.form = this.el.getElementsByClassName('js-popup-form')[0];
    }

    remove() {
        clearInterval(this.timerId);
        this.el.remove();
    }
}

export {OnlineGamePopup};