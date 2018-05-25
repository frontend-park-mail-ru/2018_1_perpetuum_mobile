/**
 *  @module components/GamePopup
 */

import template from './gamePopup.tmpl.xml';
/**
 * Popup class to show pop-up block in case of win
 */
class GamePopup {
    /**
     * Create a pop-up
     */
    constructor() {
        this.el = document.createElement('div');
        this.fest = template;
    }

    /**
     * A method that specifies the place to render pop-up
     * @param root - place to render pop-up
     * @return {GamePopup} current class instance.
     */
    renderTo(root) {
        root.appendChild(this.el);
        return this;
    }

    /**
     * Render pop-up
     * @param {object} params - description of the fields needed by the fest.
     * @return {GamePopup} current class instance.
     */
    render(params) {
        this.params = params;
        this.params.stars = [];
        for (let i = 0; i < params.numStars; i++) {
            this.params.stars[i] = 'rating__one-star-good';
        }
        for (let i = params.numStars; i < 3; i++) {
            this.params.stars[i] = 'rating__one-star';
        }
        this.el.innerHTML = this.fest(this.params);
        this.init();

        if (params.toNextLevel !== undefined) {
            const back = this.el.getElementsByClassName('js-next-level')[0];
            back.addEventListener('click', this.params.toNextLevel);
        }

        return this;
    }
}

export {GamePopup};