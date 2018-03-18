(function () {

    const ErrorForm = window.ErrorForm;

    class SettingsForm {
        constructor(formEl) {
            this.loginForm = formEl.querySelector('.js-loginLabel .js-loginInput');
            this.passwordForm = formEl.querySelector('.js-passwordLabel .js-password');
            this.oldPasswordForm = formEl.querySelector('.js-old-passwordLabel .js-old-password');
            this.emailForm = formEl.querySelector('.js-emailLabel .js-email');

            this.validateLoginBind = this.validateLogin.bind(this);
            this.validatePasswordBind =  this.validatePassword.bind(this);
            this.validateEmailBind = this.validateEmail.bind(this);

            this.loginForm.addEventListener('keyup', this.validateLoginBind);
            this.passwordForm.addEventListener('keyup', this.validatePasswordBind);
            this.emailForm.addEventListener('keyup', this.validateEmailBind);
            this.oldPasswordForm.addEventListener('keyup', this.validatePasswordBind);


            this.login = true;
            this.password = false;
            this.email = false;
            this.oldPassword = false;
        }

        validateEmail(evt) {
            if (!isEmail(evt.currentTarget.value)) {
                ErrorForm.displayErrors(evt.currentTarget, 'This is not email');
                this.email = false;
            } else {
                ErrorForm.hideErrors(evt.currentTarget);
                this.email = true;
            }
            if (!evt.currentTarget.value.length) {
                ErrorForm.removeError(evt.currentTarget);
                this.email = false;
            }
        }

        validateLogin(evt) {
            if (validateLength(evt.currentTarget.value)) {
                ErrorForm.displayErrors(evt.currentTarget, 'Login must contain at list 4 symbols');
                this.login = false;
            } else {
                ErrorForm.hideErrors(evt.currentTarget);
                this.login = true;
            }
            if (!evt.currentTarget.value.length) {
                ErrorForm.removeError(evt.currentTarget);
                this.login = false;
            }
        }

        validatePassword(evt) {
            if (validateLength(evt.currentTarget.value)) {
                ErrorForm.displayErrors(evt.currentTarget, 'Password must contain at list 4 symbols');
                this.password = false;
            } else {
                ErrorForm.hideErrors(evt.currentTarget);
                this.password = true;
            }
            if (!evt.target.value.length) {
                ErrorForm.removeError(evt.currentTarget);
                this.password = false;
            }
        }

        getError() {
            return !(((this.password || this.passwordForm.value) && (this.oldPassword || this.oldPasswordForm.value)) && (this.email || this.emailForm.value) && (this.login || this.loginForm.value)) && (this.oldPasswordForm.value && this.passwordForm.value || this.emailForm.value || this.loginForm.value);
        }


        prepare() {
            return this.getError() ? false : {'login': this.loginForm.value, 'email': this.emailForm.value, 'oldPassword': this.oldPasswordForm.value, 'password': this.passwordForm.value};
        }

        removeListeners() {
            ErrorForm.removeError(this.passwordForm);
            ErrorForm.removeError(this.emailForm);
            ErrorForm.removeError(this.loginForm);
            ErrorForm.removeError(this.oldPasswordForm);
            this.loginForm.removeEventListener('keyup', this.validateLoginBind);
            this.passwordForm.removeEventListener('keyup', this.validatePasswordBind);
            this.emailForm.removeEventListener('keyup', this.validateEmailBind);
            this.oldPasswordForm.removeEventListener('keyup', this.validatePasswordBind);
        }
    }
    window.SettingsForm = SettingsForm;
})();