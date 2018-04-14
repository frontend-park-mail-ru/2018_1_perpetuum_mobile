/**
 *  @module components/popup
 */

import {Error} from '../Error/error.js';
import {bus} from '../../Modules/bus.js';


/**
 * Popup class to show pop-up block
 */
class Popup {
    /**
     * Create a pop-up
     */
    constructor() {
        this.el = document.createElement('div');
        this.fest = window.fest['jsMvc/Components/Popup/popup.tmpl'];
        bus.on('changeProfileForm-err', Error.serverError.bind(this));
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
        this.el.innerHTML = this.fest(params);
        this.init();
        return this;
    }

    /**
     * Add handlers
     */
    init() {
        const closeButton = this.el.getElementsByClassName('js-button-close')[0];
        closeButton.addEventListener('click', this.deletePopup.bind(this));
        this.form = this.el.getElementsByClassName('js-popup-form')[0];
        this.formValid = [];

        this.params.fields.forEach((value, i) => {

            this.formValid[i] = this.form.getElementsByClassName(value[1])[0];

            this.formValid[i].addEventListener('keyup', (evt) => {

                const isValid = value[4](evt);

                this.formValid[i].valid = (isValid === true) ? Error.hideError(this.formValid[i], value[5]) : Error.showError(this.formValid[i], isValid, value[5]);

                if (this.formValid[i].value.length === 0) {
                    this.formValid.valid = Error.delError(this.formValid[i], value[5]);
                }
            });
        });


        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const allValid = this.formValid.reduce((res, current) => {
                return !!current.valid && res;
            }, true);

            if (allValid === true) {
                this.onSubmitForm(evt);
            }
        });
    }

    /**
     * Delete pop-up
     * @return {Popup} current class instance.
     */
    deletePopup() {
        this.el.innerHTML = '';
        return this;
    }
}

export {Popup};