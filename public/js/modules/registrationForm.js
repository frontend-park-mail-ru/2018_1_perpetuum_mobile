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

        validateLogin() {
            if (isEmail(this.loginForm.value) || validateLength(this.loginForm.value.length)) {
                this.errors.displayErrors('.registrationForm .loginLabel');
            } else {
                this.errors.hideErrors('.registrationForm .loginLabel');
                this.login = this.loginForm.value;
            }
        }

        validateEmail() {
            if (!isEmail(this.emailForm.value)) {
                this.errors.displayErrors('.registrationForm .emailLabel');
            } else {
                this.errors.hideErrors('.registrationForm .emailLabel');
                this.email = this.emailForm.value;
            }
        }

        validatePassword() {
            const ALLOW_INPUT_LENGTH = 4;
            if (this.passwordForm.value.length < ALLOW_INPUT_LENGTH) {
                this.errors.displayErrors('.registrationForm .passwordLabel');
            } else {
                this.errors.hideErrors('.registrationForm .passwordLabel');
                this.password = this.passwordForm.value;
            }
        }

        prepare() {
            return this.ok ? this.ok : {'login': this.login, 'email': this.email, 'password': this.password};
        }

        removeListeners() {
            this.loginForm.removeEventListener('keyup', this.validateLogin);
            this.passwordForm.removeEventListener('keyup', this.validatePassword);
            this.emailForm.removeEventListener('keyup', this.validateEmail);
        }
    }
    window.RegistrationForm = RegistrationForm;
})();