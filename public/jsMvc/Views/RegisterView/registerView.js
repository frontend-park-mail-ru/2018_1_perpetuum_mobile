/**
 *  @module views/registerView
 */

import {ViewInterface} from '../ViewInterface.js';
import {Validation} from "../../Modules/validation.js";
import {Error} from "../../Components/Error/error.js";
import {sharedData} from '../../Modules/sharedData.js';
import {bus} from "../../Modules/bus.js";
import {Colour} from '../../Components/Colour/colour.js';



class RegisterView extends ViewInterface {
    /**
     * Create a RegisterView instance.
     */
    constructor() {
        super('jsMvc/Views/RegisterView/registerView.tmpl');
        bus.on('register-err', Error.serverError.bind(this));
    }

    /**
     * Render the view.
     * @param {object} params - The object with info provided to fest.
     * @return {RegisterView} The current object instance.
     */
    render(params) {
        this.params = {
            form: 'js-register-form',
            fields: [['Login', 'js-profile-login-input', 'text', 'login', Validation.validateLogin, 'js-error-login'],
                ['Email', 'js-profile-email-input', 'email', 'email', Validation.validateEmail, 'js-error-email'],
                ['Password', 'js-profile-password-input', 'password', 'password', Validation.validatePassword, 'js-error-password']]
        };
        Object.assign(params, this.params);
        super.render(params);
        this.init();
        return this;
    }

    /**
     * Add handlers
     */
    init() {
        this.toRegisterForm = this.el.getElementsByClassName(this.params.form)[0];

        this.formValid = [];

        this.params.fields.forEach((value, i) => {

            this.formValid[i] = this.toRegisterForm.getElementsByClassName(value[1])[0];

            this.formValid[i].addEventListener('keyup', (evt) => {

                const isValid = value[4](evt);

                this.formValid[i].valid = (isValid === true) ? Error.hideError(this.formValid[i], value[5]) : Error.showError(this.formValid[i], isValid, value[5]);

                if(this.formValid[i].value.length === 0) {
                    this.formValid.valid = Error.delError(this.formValid[i], value[5]);
                }
            });
        });


        this.toRegisterForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const allValid = this.formValid.reduce((res, current) => {
                return !!current.valid && res;
            }, true);

            if(allValid === true) {
                this.onRegister(evt);
            }
        });

        this.colour = new Colour('colors');
    }


    /**
     * Is the view allowed to show.
     * @return {boolean}
     */
    isAllowed() {
        return !sharedData.data['currentUser'];
    }
}

export {RegisterView};