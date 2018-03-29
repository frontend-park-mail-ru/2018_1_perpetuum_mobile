import {errorForm} from "../Error/error.js";

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
        this.params = params;
        this.el.innerHTML = this.fest(params);
        this.init();
        return this;
    }

    init() {
        const closeButton = this.el.getElementsByClassName('js-button-close')[0];
        closeButton.addEventListener('click', this.deletePopup.bind(this));
        const form = this.el.getElementsByClassName('js-popup-form')[0];
        this.formValid = [];

        this.params.fields.forEach((value, i) => {

            this.formValid[i] = form.getElementsByClassName(value[1])[0];

            this.formValid[i].addEventListener('keyup', () => {

                const isValid = value[4](this.formValid[i].value);

                this.formValid[i].valid = (isValid === true) ? errorForm.hideError(this.formValid[i], value[5]) : errorForm.showError(this.formValid[i], isValid, value[5]);

                if (this.formValid[i].value.length === 0) {
                    this.formValid.valid = errorForm.delError(this.formValid[i], value[5]);
                }
            });
        });


        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const allValid = this.formValid.reduce((res, current) => {
                return !!current.valid && res;
            }, true);

            if(allValid === true) {
                this.onSubmitForm(evt);
            }
        });
    }

    deletePopup() {
        this.el.innerHTML = '';
        return this;
    }

}

export {Popup};