(function () {

    const ErrorForm = window.ErrorForm;

    class RegistrationForm {
        constructor(formEl) {
            this.loginForm = formEl.querySelector('.loginLabel .loginInput');
            this.passwordForm = formEl.querySelector('.passwordLabel .password');
            this.emailForm = formEl.querySelector('.emailLabel .email');

            this.loginForm.addEventListener('keyup', this.validateLogin.bind(this));
            this.passwordForm.addEventListener('keyup', this.validatePassword.bind(this));
            this.emailForm.addEventListener('keyup', this.validateEmail.bind(this));

            this.login = null;
            this.password = null;
            this.email = null;
            this.errors = new ErrorForm();
        }

        validateEmail() {
            if (!isEmail(this.emailForm.value)) {
                ErrorForm.displayErrors(this.emailForm, 'This is not email');
                this.email = null;
            } else {
                ErrorForm.hideErrors(this.emailForm);
                this.email = this.emailForm.value;
                console.log(this.emailForm);
            }
            if (!this.emailForm.value.length) {
                ErrorForm.removeError(this.emailForm);
                this.email = null;
            }
        }

        validateLogin() {
            if (validateLength(this.loginForm.value)) {
                ErrorForm.displayErrors(this.loginForm, 'Login must contain at list 4 symbols');
                this.login = null;
            } else {
                ErrorForm.hideErrors(this.loginForm);
                this.login = this.loginForm.value;
            }
            if (!this.loginForm.value.length) {
                ErrorForm.removeError(this.loginForm);
                this.login = null;
            }
        }

        validatePassword() {
            if (validateLength(this.passwordForm.value)) {
                ErrorForm.displayErrors(this.passwordForm, 'Password must contain at list 4 symbols');
                this.password = null;
            } else {
                ErrorForm.hideErrors(this.passwordForm);
                this.password = this.passwordForm.value;
            }
            if (!this.passwordForm.value.length) {
                ErrorForm.removeError(this.passwordForm);
                this.password = null;
            }
        }

        getError() {
            return !this.password || !this.login || !this.email;
        }


        prepare() {
            return this.getError() ? false : {'login': this.login, 'email': this.email, 'password': this.password};
        }

        removeListeners() {
            ErrorForm.removeError(this.passwordForm);
            ErrorForm.removeError(this.emailForm);
            ErrorForm.removeError(this.loginForm);
            this.loginForm.removeEventListener('keyup', this.validateLogin);
            this.passwordForm.removeEventListener('keyup', this.validatePassword);
            this.emailForm.removeEventListener('keyup', this.validateEmail);
        }
    }
    window.RegistrationForm = RegistrationForm;
})();