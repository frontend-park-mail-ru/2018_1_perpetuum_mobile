/**
 *  @module components/GamePopup
 */

/**
 * Popup class to show pop-up block in case of win
 */
class GamePopup {
    /**
     * Create a pop-up
     */
    constructor() {
        this.el = document.createElement('div');
        this.fest = window.fest['jsMvc/Components/GamePopup/gamePopup.tmpl'];
    }

    /**
     * A method that specifies the place to render pop-up
     * @param root - place to render pop-up
     * @return {Popup} current class instance.
     */
    renderTo(root) {
        root.appendChild(this.el);
        return this;
    }

    /**
     * Render pop-up
     * @param {object} params - description of the fields needed by the fest.
     * @return {Popup} current class instance.
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
        return this;
    }

    /**
     * Add handlers
     */
    init() {
        this.form = this.el.getElementsByClassName('js-popup-form')[0];
    }
}

export {GamePopup};