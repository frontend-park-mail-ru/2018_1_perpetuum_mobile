import {errorForm} from "../Error/error.js";

class Popup {
    constructor() {
        this.el = document.createElement('div');
        this.fest = window.fest['jsMvc/Components/Popup/popup.tmpl'];
        this.params = null;
    }

    renderTo(root) {
        root.appendChild(this.el);
        return this;
    }

    render(params) {
        this.params = params;
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


        console.log(this.params.fields);
        this.params.fields.forEach((value) => {
            const formValid = this.el.getElementsByClassName(value[1])[0];
            formValid.addEventListener('keyup', () => {
                const status = value[4](formValid.value);
                if(status !== true) {
                    errorForm.showError(formValid, status, value[5]);
                }
                if(status === true) {
                    errorForm.hideError(formValid, value[5]);
                }
                if(formValid.value.length === 0) {
                    errorForm.delError(formValid, value[5]);
                }
            });
        });
    }

    deletePopup() {
        this.el.innerHTML = '';
        return this;
    }

}

export {Popup};