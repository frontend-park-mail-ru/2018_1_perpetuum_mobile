/**
 * @module views/loginView
 */

import {ViewInterface} from '../ViewInterface.js';
import {Validation} from '../../Modules/validation.js';
import {Error} from '../../Components/Error/error.js';
import {sharedData} from '../../Modules/sharedData.js';
import {bus} from '../../Modules/bus.js';
import {Colour} from '../../Components/Colour/colour.js';
import template from './loginView.tmpl.xml';

/**
 * Login view
 * @extends ViewInterface
 */
class LoginView extends ViewInterface {
    /**
     * Create a LoginView instance.
     */
    constructor() {
        super(template);
        bus.on('login-err', Error.serverError.bind(this));
    }

    /**
     * Render the view.
     * @param {object} params - The object with info provided to fest.
     * @return {LoginView} The current object instance.
     */
    render(params = {}) {
        bus.emit('createLines');
        this.params = {
            form: 'js-login-form',
            fields: [
                {
                    value: 'Username or email address',
                    classString: 'js-profile-login-input',
                    type: 'text',
                    name: 'email',
                    validation: Validation.validateLoginOrEmail,
                    errorClassString: 'js-error-login'
                },
                {
                    value: 'Password',
                    classString: 'js-profile-password-input',
                    type: 'password',
                    name: 'password',
                    validation: Validation.validatePassword,
                    errorClassString: 'js-error-password',
                    explanation: {
                        href: {
                            value: '/reset',
                            text: 'Forgot your password?'
                        }
                    }

                }
                ],
            submit: {value: 'Login', classString: 'js-login-button'}
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
        const button = this.el.getElementsByClassName(this.params.submit.classString)[0];
        this.toLoginForm = this.el.getElementsByClassName(this.params.form)[0];
        button.disabled = true;

        this.formValid = [];

        this.params.fields.forEach((value, i) => {

            this.formValid[i] = this.toLoginForm.getElementsByClassName(value.classString)[0];

            this.formValid[i].addEventListener('keyup', (evt) => {
                const isValid = value.validation(evt);

                this.formValid[i].valid = (isValid === true) ? Error.hideError(this.formValid[i], value.errorClassString) : Error.showError(this.formValid[i], isValid, value.errorClassString);

                if (this.formValid[i].value.length === 0) {
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

        this.toLoginForm.addEventListener('submit', evt => {
            evt.preventDefault();

            const allValid = this.formValid.reduce((res, current) => {
                return !!current.valid && res;
            }, true);

            if (allValid === true) {
                button.disabled = false;
                this.onLogin(evt);
            }
        });

        const firstForm = document.querySelector('input');
        firstForm.focus();

        this.colour = new Colour('colors');
    }

    /**
     * isAllowed - is the view allowed to show.
     * @return {boolean}
     */
    isAllowed() {
        return !sharedData.data['currentUser'];
    }

    /**
     * Destroy the current view.
     * Delete all rendered html.
     * @return {LoginView} The current object instance.
     */
    destroy() {
        super.destroy();
        bus.emit('removeLines');
        return this;
    }

}

export {LoginView};
