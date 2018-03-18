(function () {

    const ErrorForm = window.ErrorForm;

    class LoginForm {
        constructor(formEl) {
            this.loginForm = formEl.querySelector('.loginLabel .loginInput');
            this.passwordForm = formEl.querySelector('.passwordLabel .password');

            this.login = null;
            this.password = null;
            this.email = null;

            this.validateLoginBind = this.validateLogin.bind(this);
            this.validatePasswordBind =  this.validatePassword.bind(this);

            this.loginForm.addEventListener('keyup', this.validateLoginBind);
            this.passwordForm.addEventListener('keyup', this.validatePasswordBind);
        }

        validateLogin() {
            if (validateLength(this.loginForm.value)) {
                ErrorForm.displayErrors(this.loginForm, 'Login must contain at least 4 symbols');
            } else {
                ErrorForm.hideErrors(this.loginForm);
                if (isEmail(this.loginForm.value)) {
                    this.email = this.loginForm.value;
                    this.login = null;
                } else {
                    this.login = this.loginForm.value;
                    this.email = null;
                }
            }
            if (!this.loginForm.value.length) {
                ErrorForm.removeError(this.loginForm);
            }
        }

        validatePassword() {
            if (validateLength(this.passwordForm.value)) {
                ErrorForm.displayErrors(this.passwordForm, 'Password must contain at least 4 symbols');
            } else {
                ErrorForm.hideErrors(this.passwordForm);
                this.password = this.passwordForm.value;
            }
            if (!this.passwordForm.value.length) {
                ErrorForm.removeError(this.passwordForm);
            }
        }

        prepare() {
            return this.getError() ? false : {'login': this.login, 'email': this.email, 'password': this.password};
        }

        getError() {
            return !this.email && !this.login || !this.password;
        }

        removeListeners() {
            ErrorForm.removeError(this.passwordForm);
            ErrorForm.removeError(this.loginForm);
            this.loginForm.removeEventListener('keyup', this.validateLoginBind);
            this.passwordForm.removeEventListener('keyup', this.validatePasswordBind);
        }
    }
    window.LoginForm = LoginForm;
})();