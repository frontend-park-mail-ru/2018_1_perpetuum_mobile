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
            fields: [['Username or email address', 'js-profile-login-input', 'text', 'email', Validation.validateLoginOrEmail, 'js-error-login'],
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
        this.toLoginForm = this.el.getElementsByClassName(this.params.form)[0];

        this.formValid = [];

        this.params.fields.forEach((value, i) => {

            this.formValid[i] = this.toLoginForm.getElementsByClassName(value[1])[0];

            this.formValid[i].addEventListener('keyup', (evt) => {
                const isValid = value[4](evt);

                this.formValid[i].valid = (isValid === true) ? Error.hideError(this.formValid[i], value[5]) : Error.showError(this.formValid[i], isValid, value[5]);

                if (this.formValid[i].value.length === 0) {
                    this.formValid.valid = Error.delError(this.formValid[i], value[5]);
                }
            });
        });

        this.toLoginForm.addEventListener('submit', evt => {
            evt.preventDefault();

            const allValid = this.formValid.reduce((res, current) => {
                return !!current.valid && res;
            }, true);

            if (allValid === true) {
                this.onLogin(evt);
            }
        });

        const firstForm = document.getElementsByClassName('js-profile-login-input')[0];
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
     * Delete all rendered html from view elementUnfixed.
     * @return {LoginView} The current object instance.
     */
    destroy() {
        super.destroy();
        bus.emit('removeLines');
        return this;
    }

}

export {LoginView};
