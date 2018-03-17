(function () {

    const ErrorForm = window.ErrorForm;

    class RegistrationForm {
        constructor() {
            this.loginForm = document.querySelector('.registrationForm .loginLabel .loginInput');
            this.passwordForm = document.querySelector('.registrationForm .passwordLabel .password');
            this.emailForm = document.querySelector('.registrationForm .emailLabel .email');

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
                this.errors.displayErrors('.registrationForm .emailLabel', 'This is not email');
            } else {
                this.errors.hideErrors('.registrationForm .emailLabel');
                this.login = this.loginForm.value;
            }
            if (!this.emailForm.value.length) {
                this.errors.removeError('.registrationForm .emailLabel');
            }
        }

        validateLogin() {
            if (validateLength(this.loginForm.value)) {
                this.errors.displayErrors('.registrationForm .loginLabel', 'Login must contain at list 4 symbols');
            } else {
                this.errors.hideErrors('.registrationForm .loginLabel');
                if (isEmail(this.loginForm.value)) {
                    this.email = this.loginForm.value;
                    this.login = null;
                } else {
                    this.login = this.loginForm.value;
                    this.email = null;
                }
            }
            if (!this.loginForm.value.length) {
                this.errors.removeError('.registrationForm .loginLabel');
            }
        }

        validatePassword() {
            if (validateLength(this.passwordForm.value)) {
                this.errors.displayErrors('.registrationForm .passwordLabel', 'Password must contain at list 4 symbols');
            } else {
                this.errors.hideErrors('.registrationForm .passwordLabel');
                this.password = this.passwordForm.value;
            }
            if (!this.passwordForm.value.length) {
                this.errors.removeError('.registrationForm .passwordLabel');
            }
        }

        prepare() {
            return this.errors.getErr() ? this.errors.getErr() : {'login': this.login, 'email': this.email, 'password': this.password};
        }

        removeListeners() {
            this.loginForm.removeEventListener('keyup', this.validateLogin);
            this.passwordForm.removeEventListener('keyup', this.validatePassword);
            this.emailForm.removeEventListener('keyup', this.validateEmail);
        }
    }
    window.RegistrationForm = RegistrationForm;
})();