class Popup {
    constructor(el) {
        this.el = el;
        this.elPopupForm = document.createElement('div');
        this.fest = window.fest['jsMvc/Components/Popup/popup.tmpl'];
    }

    render(params) {
        const festGenerics = this.fest(params);
        this.elPopupForm.innerHTML = festGenerics;
        this.el.appendChild(this.elPopupForm);
        this.init();
        return this;
    }

    init() {
        const closeButton = this.el.getElementsByClassName('js-button-close')[0];
        closeButton.addEventListener('click', this.deletePopup.bind(this));
    }

    deletePopup() {
        this.elPopupForm.innerHTML = '';
        return this;
    }
}

export {Popup};