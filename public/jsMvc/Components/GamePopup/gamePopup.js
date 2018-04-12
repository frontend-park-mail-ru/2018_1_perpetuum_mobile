class GamePopup {

    constructor() {
        this.el = document.createElement('div');
        this.fest = window.fest['jsMvc/Components/GamePopup/gamePopup.tmpl'];
    }

    renderTo(root) {
        root.appendChild(this.el);
        return this;
    }

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

    init() {
        this.form = this.el.getElementsByClassName('js-popup-form')[0];
    }
}

export {GamePopup};