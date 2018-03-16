(function () {

    class RegistrationForm {
        constructor(form) {
            this.loginForm = document.querySelector(form).getElementsByClassName('loginInput')[0];
            this.emailForm = document.querySelector(form).getElementsByClassName('email')[0];
            this.passwordForm = document.querySelector(form).getElementsByClassName('password')[0];

            this.validateLogin = this.validateLogin.bind(this);
            this.validatePassword = this.validatePassword.bind(this);
            this.validateEmail = this.validateEmail.bind(this);

            this.login = null;
            this.password = null;
            this.email = null;

            this.loginForm.addEventListener('keyup', this.validateLogin);
            this.passwordForm.addEventListener('keyup', this.validatePassword);
            this.emailForm.addEventListener('keyup', this.validateEmail);

            this.ok = false;
        }

        validateLogin() {
            const ALLOW_INPUT_LENGTH = 4;
            const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(this.loginForm.value.length < ALLOW_INPUT_LENGTH || !EMAIL_PATTERN.test(this.loginForm.value)) {
                this.loginForm.style.boxShadow = '0 0 10px red';
                this.ok = true;
            } else {
                this.loginForm.style.boxShadow = '0 0 5px green';
                this.ok = false;
                this.email = null;
                this.login = this.loginForm.value;
            }

        }

        validateEmail() {
            const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!EMAIL_PATTERN.test(this.loginForm.value)) {
                this.loginForm.style.boxShadow = '0 0 10px red';
            } else {
                this.loginForm.style.boxShadow = '0 0 5px green';
                this.email = this.loginForm.value;
                this.login = null;
            }
        }

        validatePassword() {
            const ALLOW_INPUT_LENGTH = 4;
            if(this.passwordForm.value.length < ALLOW_INPUT_LENGTH) {
                this.passwordForm.style.boxShadow = '0 0 10px red';
            } else {
                this.passwordForm.style.boxShadow = '0 0 5px green';
                this.password = this.passwordForm.value;
            }

        }

        validation() {

        }

        prepare() {
            return {'login': this.login, 'email': this.email, 'password': this.password};
        }

    }
    window.LoginForm = LoginForm;
})();