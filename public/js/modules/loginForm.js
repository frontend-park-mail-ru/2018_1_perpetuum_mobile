(function () {

    const ErrorForm = window.ErrorForm;

    class LoginForm {
        constructor() {
            this.loginForm = document.querySelector('.loginForm .loginLabel .loginInput');
            this.passwordForm = document.querySelector('.loginForm .passwordLabel .password');

            this.login = null;
            this.password = null;
            this.email = null;
            this.errors = new ErrorForm();

            this.loginForm.addEventListener('keyup', this.validateLogin.bind(this));
            this.passwordForm.addEventListener('keyup', this.validatePassword.bind(this));
        }

        validateLogin() {
            if (validateLength(this.loginForm.value)) {
                this.errors.displayErrors('.loginForm .loginLabel', 'Login must contain at list 4 symbols');
            } else {
                this.errors.hideErrors('.loginForm .loginLabel');
                if (isEmail(this.loginForm.value)) {
                    this.email = this.loginForm.value;
                    this.login = null;
                } else {
                    this.login = this.loginForm.value;
                    this.email = null;
                }
            }
            if (!this.loginForm.value.length) {
                this.errors.removeError('.loginForm .loginLabel');
            }
        }

        validatePassword() {
            if (validateLength(this.passwordForm.value)) {
                this.errors.displayErrors('.loginForm .passwordLabel', 'Password must contain at list 4 symbols');
            } else {
                this.errors.hideErrors('.loginForm .passwordLabel');
                this.password = this.passwordForm.value;
            }
            if (!this.passwordForm.value.length) {
                this.errors.removeError('.loginForm .passwordLabel');
            }
        }

        prepare() {
            return this.errors.getErr() ? this.errors.getErr() : {'login': this.login, 'email': this.email, 'password': this.password};
        }

        removeListeners() {
            this.loginForm.removeEventListener('keyup', this.validateLogin);
            this.passwordForm.removeEventListener('keyup', this.validatePassword);
        }
    }
    window.LoginForm = LoginForm;
})();