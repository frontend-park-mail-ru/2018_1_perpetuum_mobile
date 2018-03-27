import {ViewInterface} from '../ViewInterface.js';
import {Popup} from "../../Components/Popup/popup.js";
import {sharedData} from '../../Modules/sharedData.js';
import {Validation} from "../../Modules/validation.js";

class ProfileView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/ProfileView/profileView.tmpl');
        this._popup = new Popup();
    }

    render(params = {}) {
        params.sharedData = sharedData.data;
        super.render(params);
        this.init();
        return this;
    }

    init() {
        const loginEditButton = this.el.getElementsByClassName('js-profile-login-change-button')[0];
        loginEditButton.addEventListener('click', () => {
            const popupEl = this.el.getElementsByClassName('js-wrapper-block')[0];
            this._popup.renderTo(popupEl);
            this._popup.onSubmitForm = this.onChangeLogin;
            this._popup.render({
                title: 'Change login',
                fields: [['Login', 'js-profile-login-input', 'text', 'login', Validation.validateLogin, 'js-error-login'],
                         ['Confirm password', 'js-profile-password-input', 'password', 'oldPassword', Validation.validatePassword, 'js-error-password']],
                buttonValue: 'Change login'
            });
        });
        const emailEditButton = this.el.getElementsByClassName('js-profile-email-change-button')[0];
        emailEditButton.addEventListener('click', () => {
            const popupEl = this.el.getElementsByClassName('js-wrapper-block')[0];
            this._popup.renderTo(popupEl);
            this._popup.onSubmitForm = this.onChangeEmail;
            this._popup.render({
                title: 'Change Email',
                fields: [['Email', 'js-profile-email-input', 'email', 'email', Validation.validateEmail, 'js-error-email'],
                         ['Confirm password', 'js-profile-password-input', 'password', 'oldPassword', Validation.validatePassword, 'js-error-password']],
                buttonValue: 'Change email'
            });
        });
        const passwordEditButton = this.el.getElementsByClassName('js-profile-password-change-button')[0];
        passwordEditButton.addEventListener('click', () => {
            const popupEl = this.el.getElementsByClassName('js-wrapper-block')[0];
            this._popup.renderTo(popupEl);
            this._popup.onSubmitForm = this.onChangePassword;
            this._popup.render({
                title: 'Change password',
                fields: [['Old password', 'js-profile-old-password-input', 'password', 'oldPassword'],
                         ['New password', 'js-profile-new-password-input', 'password', 'newPassword'],
                         ['Confirm new password', 'js-profile-confirm-new-password-input', 'password', 'confirmNewPassword']],
                buttonValue: 'Change password'
            });
        });
        const changeImageForm = this.el.getElementsByClassName('js-changeImageForm')[0];
        changeImageForm.addEventListener('submit', this.onChangeImage);
        if (sharedData.data['currentUser']) {
            const toLogoutForm = this.el.getElementsByClassName('js-logout-form')[0];
            toLogoutForm.addEventListener('submit', this.onLogout);
        }
    }
}

export {ProfileView};