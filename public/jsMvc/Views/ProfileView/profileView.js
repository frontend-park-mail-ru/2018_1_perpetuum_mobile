import {ViewInterface} from '../ViewInterface.js';
import {Popup} from "../../Components/Popup/popup.js";

class ProfileView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/ProfileView/profileView.tmpl');
        this._popup = new Popup(this.el);
    }

    render(params) {
        super.render(params);
        this.init();
        return this;
    }

    init() {
        const loginEditButton = this.el.getElementsByClassName('js-profile-login-change-button')[0];
        loginEditButton.addEventListener('click', () => {
            this._popup.render({
                title: 'Change login',
                fields: [['Login', 'js-profile-login-input', 'text', 'login'], ['Confirm password', 'js-profile-password-input', 'password', 'oldPassword']],
                formClasses: ['js-login-form'],
                buttonValue: 'Change login'
            })
        });
        const emailEditButton = this.el.getElementsByClassName('js-profile-email-change-button')[0];
        emailEditButton.addEventListener('click', () => {
            this._popup.render({
                title: 'Change Email',
                fields: [['Email', 'js-profile-email-input', 'email', 'email'], ['Confirm password', 'js-profile-password-input', 'password', 'oldPassword']],
                formClasses: ['js-email-form'],
                buttonValue: 'Change email'
            })
        });
        const passwordEditButton = this.el.getElementsByClassName('js-profile-password-change-button')[0];
        passwordEditButton.addEventListener('click', () => {
            this._popup.render({
                title: 'Change password',
                fields: [['Old password', 'js-profile-old-password-input', 'password', 'oldPassword'],
                         ['New password', 'js-profile-new-password-input', 'password', 'newPassword'],
                         ['Confirm new password', 'js-profile-confirm-new-passeord-input', 'password', 'confirmNewPassword']],
                formClasses: ['js-password-form'],
                buttonValue: 'Change password'
            })
        });
    }
}

export {ProfileView};