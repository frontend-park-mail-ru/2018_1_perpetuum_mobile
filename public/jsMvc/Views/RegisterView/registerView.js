/**
 *  @module views/registerView
 */

import {ViewInterface} from '../ViewInterface.js';
import {Validation} from '../../Modules/validation.js';
import {Error} from '../../Components/Error/error.js';
import {sharedData} from '../../Modules/sharedData.js';
import {bus} from '../../Modules/bus.js';
import {Colour} from '../../Components/Colour/colour.js';
import template from './registerView.tmpl.xml';



class RegisterView extends ViewInterface {
    /**
     * Create a RegisterView instance.
     */
    constructor() {
        super(template);
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
            fields: [
                {
                    value: 'Login',
                    classString: 'js-profile-login-input',
                    type: 'text',
                    name: 'login',
                    validation: Validation.validateLogin,
                    errorClassString: 'js-error-login'
                },
                {
                    value: 'Email',
                    classString: 'js-profile-email-input',
                    type: 'email',
                    name: 'email',
                    validation: Validation.validateEmail,
                    errorClassString: 'js-error-email'
                },
                {
                    value: 'Password',
                    classString: 'js-profile-password-input',
                    type: 'password',
                    name: 'password',
                    validation: Validation.validatePassword,
                    errorClassString: 'js-error-password'
                }
                ],
            submit: {value: 'Register', classString: 'js-register-button'}
        };
        Object.assign(params, this.params);
        super.render(params);
        this.init();
        bus.emit('createLines');
        return this;
    }

    /**
     * Add handlers
     */
    init() {
        this.toRegisterForm = this.el.getElementsByClassName(this.params.form)[0];
        const button = this.el.getElementsByClassName(this.params.submit.classString)[0];
        button.disabled = true;
        this.formValid = [];

        this.params.fields.forEach((value, i) => {

            this.formValid[i] = this.toRegisterForm.getElementsByClassName(value.classString)[0];

            this.formValid[i].addEventListener('keyup', (evt) => {

                const isValid = value.validation(evt);

                this.formValid[i].valid = (isValid === true) ? Error.hideError(this.formValid[i], value.errorClassString) : Error.showError(this.formValid[i], isValid, value.errorClassString);

                if (!this.formValid[i].value.length) {
                    this.formValid.valid = Error.delError(this.formValid[i], value.errorClassString);
                }
                const allValid = this.formValid.reduce((res, current) => {
                    return !!current.valid && res;
                }, true);

                if (!allValid) {
                    button.disabled = true;
                    return;
                }
                button.disabled = false;
            });
        });


        this.toRegisterForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const allValid = this.formValid.reduce((res, current) => {
                return !!current.valid && res;
            }, true);

            if (allValid === true) {
                button.disabled = false;
                this.onRegister(evt);
            }
        });

        this.colour = new Colour('colors');
        const firstForm = document.querySelector('input');
        firstForm.focus();
    }


    /**
     * Is the view allowed to show.
     * @return {boolean}
     */
    isAllowed() {
        return !sharedData.data['currentUser'];
    }

    /**
     * Destroy the current view.
     * Delete all rendered html.
     * @return {RegisterView} The current object instance.
     */
    destroy() {
        super.destroy();
        bus.emit('removeLines');
        return this;
    }
}

export {RegisterView};