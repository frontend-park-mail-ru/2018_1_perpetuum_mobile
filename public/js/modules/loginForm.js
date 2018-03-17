(function () {

    const ErrorForm = window.ErrorForm;

    class LoginForm {
        constructor() {
            this.loginForm = document.querySelector('.loginForm .loginLabel .loginInput');
            this.passwordForm = document.querySelector('.loginForm .passwordLabel .password');

            this.login = null;
            this.password = null;
            this.email = null;

            this.loginForm.addEventListener('keyup', this.validateLogin.bind(this));
            this.passwordForm.addEventListener('keyup', this.validatePassword.bind(this));

            this.errors = new ErrorForm();
        }

        validateLogin() {
            const ALLOW_INPUT_LENGTH = 4;
            if (this.loginForm.value.length < ALLOW_INPUT_LENGTH) {
                this.errors.displayErrors('.loginForm .loginLabel');
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
        }

        validatePassword() {
            const ALLOW_INPUT_LENGTH = 4;
            if (this.passwordForm.value.length < ALLOW_INPUT_LENGTH) {
                this.errors.displayErrors('.loginForm .passwordLabel');
            } else {
                this.errors.hideErrors('.loginForm .passwordLabel');
                this.password = this.passwordForm.value;
            }
        }

        prepare() {
            return this.errors.getErr() ? this.ok : {'login': this.login, 'email': this.email, 'password': this.password};
        }

        removeListeners() {
            this.loginForm.removeEventListener('keyup', this.validateLogin);
            this.passwordForm.removeEventListener('keyup', this.validatePassword);
        }
    }
    window.LoginForm = LoginForm;
})();