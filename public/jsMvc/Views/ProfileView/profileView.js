import {ViewInterface} from '../ViewInterface.js';
import {Popup} from "../../Components/Popup/popup.js";
import {sharedData} from '../../Modules/sharedData.js';
import {Validation} from "../../Modules/validation.js";
import {Error} from '../../Components/Error/error.js';
import {bus} from '../../Modules/bus.js';


/** Profile view
 *  @class ProfileView
 *  */
class ProfileView extends ViewInterface {
    /**
     * create a ProfileView instance
     */
    constructor() {
        super('jsMvc/Views/ProfileView/profileView.tmpl');
        this._popup = new Popup();
        bus.on('changeImage-err', Error.showAvatarError.bind(this));
        this.initParams();
    }

    /**
     * A method that specifies the place to render ProfileView
     * @param params - place to render view
     * @return {ProfileView} current class instance.
     */
    render(params = {}) {
        params.sharedData = sharedData.data;
        super.render(params);
        this.init();
        return this;
    }

    /**
     * Add handlers
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
    }

    /**
     * addPopup - callback to render a popup
     * @param params - parameters with form and inputs that need to be rendered in popup
     */
    addPopup(params) {
        const popupEl = this.el.getElementsByClassName('js-wrapper-block')[0];
        this._popup.renderTo(popupEl);
        this._popup.onSubmitForm = this.onChangeLogin;
        this._popup.render(params);
    }

    /**
     * isAllowed - is there a current user in the data
     * @return {boolean}
     */
    isAllowed() {
        return !!sharedData.data['currentUser'];
    }

    /**
     * initParams to initialize parameters to popup
     */
    initParams() {
        this.changeLoginParams = {
            title: 'Change login',
            fields: [['Login', 'js-profile-login-input', 'text', 'login', Validation.validateLogin, 'js-error-login'],
                ['Confirm password', 'js-profile-password-input', 'password', 'oldPassword', Validation.validatePassword, 'js-error-password']],
            buttonValue: 'Change login'
        };

        this.changeEmailParams = {
            title: 'Change Email',
            fields: [['Email', 'js-profile-email-input', 'email', 'email', Validation.validateEmail, 'js-error-email'],
                ['Confirm password', 'js-profile-password-input', 'password', 'oldPassword', Validation.validatePassword, 'js-error-password']],
            buttonValue: 'Change email'
        };

        this.changePasswordParams = {
            title: 'Change password',
            fields: [['Old password', 'js-profile-old-password-input', 'password', 'oldPassword'],
            ['New password', 'js-profile-new-password-input', 'password', 'newPassword'],
            ['Confirm new password', 'js-profile-confirm-new-password-input', 'password', 'confirmNewPassword']],
            buttonValue: 'Change password'
        };
    }

    /**
     * validateAvatar to validate size or type uploaded avatar
     * @param evt - event
     * @return {boolean} - validity status
     */
    static validateAvatar(evt) {
        const avatar = evt.target.files[0];
        const isValid = Validation.validateImage(avatar);
        if(isValid !== true) {
            document.getElementsByClassName('js-profile-settings-file-name')[0].innerHTML = avatar.name;
        }
        return (isValid !== true) ? Error.showAvatarError(isValid) : Error.hideAvatarError();
    }
}

export {ProfileView};