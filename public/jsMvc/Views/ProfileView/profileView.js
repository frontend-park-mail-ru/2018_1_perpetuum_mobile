/**
 *  @module views/profileView
 */


import {ViewInterface} from '../ViewInterface.js';
import {Popup} from '../../Components/Popup/popup.js';
import {sharedData} from '../../Modules/sharedData.js';
import {Validation} from '../../Modules/validation.js';
import {Error} from '../../Components/Error/error.js';
import {bus} from '../../Modules/bus.js';
import {Colour} from '../../Components/Colour/colour.js';
import template from './profileView.tmpl.xml';


class ProfileView extends ViewInterface {
    /**
     * Create a ProfileView instance.
     */
    constructor() {
        super(template);
        this._popup = new Popup();
        bus.on('changeImage-err', Error.showAvatarError.bind(this));
    }

    /**
     * A method that specifies the place to render ProfileView
     * @param params - The object with info provided to fest.
     * @return {ProfileView} The current object instance.
     */
    render(params = {}) {
        params.sharedData = sharedData.data;
        super.render(params);
        this.initParams();
        this.init();
        bus.emit('createLines');
        return this;
    }

    /**
     * Add handlers.
     */
    init() {
        const forms = ['js-profile-login-change-button', 'js-profile-email-change-button', 'js-profile-password-change-button'];
        const params = [this.changeLoginParams, this.changeEmailParams, this.changePasswordParams];

        forms.forEach((currentForm, i) => {
            const form = this.el.getElementsByClassName(currentForm)[0];
            form.addEventListener('click', this.addPopup.bind(this, params[i]));
        });

        const changeImageForm = this.el.getElementsByClassName('js-changeImageForm')[0];
        changeImageForm.addEventListener('change', evt => {
            const status = ProfileView.validateAvatar(evt);
            if (status) {
                this.onChangeImage(evt);
            }
        });

        if (sharedData.data['currentUser']) {
            const toLogoutForm = this.el.getElementsByClassName('js-logout-form')[0];
            toLogoutForm.addEventListener('submit', this.onLogout);
        }

        this.colour = new Colour('colors');
    }

    /**
     * Callback to render a popup
     * @param params - parameters with form and inputs that need to be rendered in popup
     */
    addPopup(params) {
        const popupEl = this.el.getElementsByClassName('js-wrapper-block')[0];
        this._popup.renderTo(popupEl);
        this._popup.onSubmitForm = params.changeForm;
        this._popup.render(params);
    }

    /**
     * Is the view is allowed to render.
     * @return {boolean}
     */
    isAllowed() {
        return !!sharedData.data['currentUser'];
    }

    /**
     * Initialize parameters to popup.
     */
    initParams() {
        this.changeLoginParams = {
            title: 'Change login',
            fields: [['Login', 'js-profile-login-input', 'text', 'login', Validation.validateLogin, 'js-error-login'],
                ['Confirm password', 'js-profile-password-input', 'password', 'oldPassword', Validation.validatePassword, 'js-error-password']],
            buttonValue: 'Change login',
            changeForm: this.onChangeLogin
        };

        this.changeEmailParams = {
            title: 'Change Email',
            fields: [['Email', 'js-profile-email-input', 'email', 'email', Validation.validateEmail, 'js-error-email'],
                ['Confirm password', 'js-profile-password-input', 'password', 'oldPassword', Validation.validatePassword, 'js-error-password']],
            buttonValue: 'Change email',
            changeForm: this.onChangeEmail
        };

        this.changePasswordParams = {
            title: 'Change password',
            fields: [['Old password', 'js-profile-old-password-input', 'password', 'oldPassword', Validation.validatePassword, 'js-error-oldPassword'],
                ['New password', 'js-profile-new-password-input', 'password', 'newPassword', Validation.validatePassword, 'js-error-newPassword'],
                ['Confirm new password', 'js-profile-confirm-new-password-input', 'password', 'confirmNewPassword', Validation.validatePasswordRepeat.bind(null, 'js-profile-new-password-input'), 'js-error-confirmNewPassword']],
            buttonValue: 'Change password',
            changeForm: this.onChangePassword
        };
    }

    /**
     * Validate avatar to validate size and type of it.
     * @param evt - Event on form where the image in. The image must be in [0] form index.
     * @return {boolean} - Validity status.
     */
    static validateAvatar(evt) {
        const avatar = evt.target.files[0];
        const isValid = Validation.isValidImage(avatar);
        if (isValid !== true) {
            document.getElementsByClassName('js-profile-settings-file-name')[0].innerHTML = avatar.name;
        }
        return (isValid !== true) ? Error.showAvatarError(isValid) : Error.hideAvatarError();
    }

    /**
     * Destroy the current view.
     * Delete all rendered html from view elementUnfixed.
     * @return {ProfileView} The current object instance.
     */
    destroy() {
        super.destroy();
        bus.emit('removeLines');
        return this;
    }
}

export {ProfileView};