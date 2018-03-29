import {ViewInterface} from '../ViewInterface.js';
import {Validation} from "../../Modules/validation.js";
import {errorForm} from "../../Components/Error/error.js";

class RegisterView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/RegisterView/registerView.tmpl');
    }


    render(params) {
        this.params = {
            form: 'js-register-form',
            fields: [['Login', 'js-profile-login-input', 'text', 'login', Validation.validateLogin, 'js-error-login'],
                ['Email', 'js-profile-email-input', 'email', 'email', Validation.validateEmail, 'js-error-email'],
                ['Password', 'js-profile-password-input', 'password', 'oldPassword', Validation.validatePassword, 'js-error-password']]
        };
        super.render(this.params);
        this.init();
        return this;
    }

    init() {
        const toRegisterForm = this.el.getElementsByClassName(this.params.form)[0];

        this.formValid = [];

        this.params.fields.forEach((value, i) => {

            this.formValid[i] = toRegisterForm.getElementsByClassName(value[1])[0];

            this.formValid[i].addEventListener('keyup', () => {

                const isValid = value[4](this.formValid[i].value);

                this.formValid[i].valid = (isValid === true) ? errorForm.hideError(this.formValid[i], value[5]) : errorForm.showError(this.formValid[i], isValid, value[5]);

                if(this.formValid[i].value.length === 0) {
                    this.formValid.valid = errorForm.delError(this.formValid[i], value[5]);
                }
            });
        });


        toRegisterForm.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const allValid = this.formValid.reduce((res, current) => {
                return !!current.valid && res;
            }, true);

            if(allValid === true) {
                this.onRegister(evt);
            }
        });
    }
}

export {RegisterView};