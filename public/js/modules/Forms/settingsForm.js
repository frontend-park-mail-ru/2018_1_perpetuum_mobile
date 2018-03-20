(function () {

    const ErrorForm = window.ErrorForm;

    class SettingsForm {
        constructor(formEl) {
            this.loginForm = formEl.querySelector('.js-change-profile-form__login');
            this.passwordForm = formEl.querySelector('.js-change-profile-form__new-password');
            this.oldPasswordForm = formEl.querySelector('.js-change-profile-form__old-password');
            this.emailForm = formEl.querySelector('.js-change-profile-form__email');

            this.validateLoginBind = this.validateLogin.bind(this);
            this.validatePasswordBind =  this.validatePassword.bind(this);
            this.validateEmailBind = this.validateEmail.bind(this);

            this.forms = [this.emailForm, this.passwordForm, this.oldPasswordForm, this.loginForm];
            this.binds = [this.validateEmailBind, this.validatePasswordBind, this.validatePasswordBind, this.validateLoginBind];

            this.forms.forEach((item, i) => {
                item.addEventListener('keyup', this.binds[i]);
            });

            this.isRightLogin = true;
            this.isRightPassword = false;
            this.isRightEmail = false;
            this.isRightOldPassword = false;
        }

        validateEmail(evt) {
            if (!isEmail(evt.currentTarget.value)) {
                ErrorForm.displayErrors(evt.currentTarget, 'This is not email');
                this.isRightEmail = false;
            } else {
                ErrorForm.hideErrors(evt.currentTarget);
                this.isRightEmail = true;
            }
            if (!evt.currentTarget.value.length) {
                ErrorForm.removeError(evt.currentTarget);
                this.isRightEmail = false;
            }
        }

        validateLogin(evt) {
            if (validateLength(evt.currentTarget.value)) {
                ErrorForm.displayErrors(evt.currentTarget, 'Login must contain at list 4 symbols');
                this.isRightLogin = false;
            } else {
                ErrorForm.hideErrors(evt.currentTarget);
                this.isRightLogin = true;
            }
            if (!evt.currentTarget.value.length) {
                ErrorForm.removeError(evt.currentTarget);
                this.isRightLogin = false;
            }
        }

        validatePassword(evt) {
            if (validateLength(evt.currentTarget.value)) {
                ErrorForm.displayErrors(evt.currentTarget, 'Password must contain at list 4 symbols');
                this.isRightPassword = false;
            } else {
                ErrorForm.hideErrors(evt.currentTarget);
                this.isRightPassword = true;
            }
            if (!evt.target.value.length) {
                ErrorForm.removeError(evt.currentTarget);
                this.isRightPassword = false;
            }
        }

        getError() {
            return !(((this.isRightPassword || this.passwordForm.value) && (this.isRightOldPassword || this.oldPasswordForm.value)) && (this.isRightEmail || this.emailForm.value) && (this.isRightLogin || this.loginForm.value)) && (this.oldPasswordForm.value && this.passwordForm.value || this.emailForm.value || this.loginForm.value);
        }

        prepare() {
            return this.getError() ? false : {'login': this.loginForm.value, 'email': this.emailForm.value, 'oldPassword': this.oldPasswordForm.value, 'password': this.passwordForm.value};
        }

        removeListeners() {
            this.forms.forEach((item, i) => {
                ErrorForm.removeError(item);
                item.removeEventListener('keyup', this.binds[i]);
            });
        }
    }
    window.SettingsForm = SettingsForm;
})();