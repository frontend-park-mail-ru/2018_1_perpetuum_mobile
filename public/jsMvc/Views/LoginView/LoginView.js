import {ViewInterface} from '../ViewInterface.js';
import {Validation} from "../../Modules/validation.js";
import {Error} from "../../Components/Error/error.js";
import {sharedData} from '../../Modules/sharedData.js';
import {bus} from "../../Modules/bus.js";

/** Login view
 *  @class LoginView
 *  */
class LoginView extends ViewInterface {
    /**
     * create a LoginView instance
     */
    constructor() {
        super('jsMvc/Views/LoginView/loginView.tmpl');
        bus.on('login-err', Error.serverError.bind(this));
    }

    /**
     * A method that specifies the place to render LoginView
     * @param params - place to render view
     * @return {ProfileView} current class instance.
     */
    render(params) {
        this.params = {
            form: 'js-login-form',
            fields: [['Username or email address', 'js-profile-login-input', 'text', 'email', Validation.validateLoginOrEmail, 'js-error-login'],
                     ['Password', 'js-profile-password-input', 'password', 'password', Validation.validatePassword, 'js-error-password']]
        };
        super.render(this.params);
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

            this.formValid[i].addEventListener('keyup', () => {
                const isValid = value[4](this.formValid[i].value);

                this.formValid[i].valid = (isValid === true) ? Error.hideError(this.formValid[i], value[5]) : Error.showError(this.formValid[i], isValid, value[5]);

                if(this.formValid[i].value.length === 0) {
                    this.formValid.valid = Error.delError(this.formValid[i], value[5]);
                }
            });
        });

        this.toLoginForm.addEventListener('submit', evt => {
            evt.preventDefault();

            const allValid = this.formValid.reduce((res, current) => {
                return !!current.valid && res;
            }, true);

            if(allValid === true) {
                this.onLogin(evt);
            }
        });
    }

    /**
     * isAllowed - is there a current user in the data
     * @return {boolean}
     */
    isAllowed() {
        return !sharedData.data['currentUser'];
    }

}

export {LoginView};
