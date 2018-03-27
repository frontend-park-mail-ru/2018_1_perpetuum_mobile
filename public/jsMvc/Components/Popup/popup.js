class Popup {
    constructor() {
        this.el = document.createElement('div');
        this.fest = window.fest['jsMvc/Components/Popup/popup.tmpl'];
    }

    renderTo(root) {
        root.appendChild(this.el);
        return this;
    }

    render(params) {
        const festGenerics = this.fest(params);
        this.el.innerHTML = festGenerics;
        this.init();
        return this;
    }

    init() {
        const closeButton = this.el.getElementsByClassName('js-button-close')[0];
        closeButton.addEventListener('click', this.deletePopup.bind(this));
        const form = this.el.getElementsByClassName('js-popup-form')[0];
        form.addEventListener('submit', this.onSubmitForm);
    }

    deletePopup() {
        this.el.innerHTML = '';
        return this;
    }
}

export {Popup};