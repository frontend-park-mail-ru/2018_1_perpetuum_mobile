(function () {

    const ErrorForm = window.ErrorForm;

    class RegistrationForm {
        constructor(formEl) {
            this.loginForm = formEl.querySelector('.loginLabel .loginInput');
            this.passwordForm = formEl.querySelector('.passwordLabel .password');
            this.emailForm = formEl.querySelector('.emailLabel .email');

            this.validateLoginBind = this.validateLogin.bind(this);
            this.validatePasswordBind =  this.validatePassword.bind(this);
            this.validateEmailBind = this.validateEmail.bind(this);

            this.forms = [this.emailForm, this.passwordForm, this.loginForm];
            this.binds = [this.validateEmailBind, this.validatePasswordBind, this.validateLoginBind];

            this.forms.forEach((item, i) => {
                item.addEventListener('keyup', this.binds[i]);
            });

            this.isRightLogin = false;
            this.isRigthPassword = false;
            this.isRigthEmail = false;
        }

        validateEmail(evt) {
            if (!isEmail(evt.currentTarget.value)) {
                ErrorForm.displayErrors(evt.currentTarget, 'This is not email');
                this.isRigthEmail = false;
            } else {
                ErrorForm.hideErrors(evt.currentTarget);
                this.isRigthEmail = true;
            }
            if (!evt.currentTarget.value.length) {
                ErrorForm.removeError(evt.currentTarget);
                this.isRigthEmail = false;
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
                this.isRigthPassword = false;
            } else {
                ErrorForm.hideErrors(evt.currentTarget);
                this.isRigthPassword = true;
            }
            if (!evt.target.value.length) {
                ErrorForm.removeError(evt.currentTarget);
                this.isRigthPassword = false;
            }
        }

        getError() {
            return !this.isRigthPassword || !this.isRightLogin || !this.isRigthEmail;
        }


        prepare() {
            return this.getError() ? false : {'login': this.loginForm.value, 'email': this.emailForm.value, 'password': this.passwordForm.value};
        }

        removeListeners() {
            this.forms.forEach((item, i) => {
                ErrorForm.removeError(item);
                item.removeEventListener('keyup', this.binds[i]);
            });
        }
    }
    window.RegistrationForm = RegistrationForm;
})();