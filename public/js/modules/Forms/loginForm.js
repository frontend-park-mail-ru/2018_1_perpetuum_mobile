(function () {

    const ErrorForm = window.ErrorForm;

    class LoginForm {
        constructor(formEl) {
            this.loginForm = formEl.querySelector('.js-login-form__login');
            this.passwordForm = formEl.querySelector('.js-login-form__password');

            this.login = null;
            this.password = null;
            this.email = null;

            this.validateLoginBind = this.validateLogin.bind(this);
            this.validatePasswordBind =  this.validatePassword.bind(this);

            this.forms = [this.passwordForm, this.loginForm];
            this.binds = [this.validatePasswordBind, this.validateLoginBind];

            this.forms.forEach((item, i) => {
                item.addEventListener('keyup', this.binds[i]);
            });
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
            this.forms.forEach((item, i) => {
                ErrorForm.removeError(item);
                item.removeEventListener('keyup', this.binds[i]);
            });
        }
    }
    window.LoginForm = LoginForm;
})();