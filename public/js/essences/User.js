(function () {

    const UserFooter = window.UserFooterComponent;

    const HttpModule = window.HttpModule;
    const RegistrationForm = window.RegistrationForm;
    const LoginForm = window.LoginForm;
    const ChangeProfileForm = window.SettingsForm;
    const ChangeImageForm = window.ChangeImageForm;

    const httpModule = new HttpModule();

    function changeProfile(data) {
        return httpModule.doPostFetch({url: httpModule.baseUrl + '/settings', data: data});
    }

    function changeImage(data) {
        return httpModule.doPostDataFetch({url: httpModule.baseUrl + '/change_avatar', data: data});
    }

    function logoutUser() {
        return httpModule.doPostFetch({url: httpModule.baseUrl + '/logout'});
    }

    function loginUser(user) {
        return httpModule.doPostFetch({url: httpModule.baseUrl + '/login', data: user});
    }

    function registerUser(user) {
        return httpModule.doPostFetch({url: httpModule.baseUrl + '/register', data: user});
    }

    function loadMe() {
        return httpModule.doGetFetch({url: httpModule.baseUrl + '/me'});
    }


    class User {

        constructor () {
            this.logoutClassQs = 'logoutForm';
            this.userFooter = new UserFooterComponent(isQuerySelector('.profile'));
            this.userFooter.logoutClass = this.logoutClassQs;

            this.loginBindFunction = this.login.bind(this);
            this.registerBindFunc = this.register.bind(this);
            this.logoutBindFunc = this.logout.bind(this);
            this.changeImageBindFunc = this.changeImage.bind(this);
            this.changeProfileBindFunc = this.changeProfile.bind(this);
            this.imageInProfile = document.getElementById('imageInProfile');
        }

        set changeProfileForm(changeProfileFormQs) {
            if (this.changeProfileEl) {
                this.changeProfileFormEl.removeListeners();
                this.changeProfileEl.removeEventListener('submit', this.changeProfileBindFunc);
            }

            this.changeProfileEl = isQuerySelector(changeProfileFormQs);
            this.changeProfileFormEl = new ChangeProfileForm(this.changeProfileEl);
            this.changeProfileEl.reset();
            this.changeProfileEl.addEventListener('submit', this.changeProfileBindFunc);
        }


        set changeImageForm(changeImageFormQs) {
            if (this.changeImageEl) {
                this.changeImageFormEl.removeListeners();
                this.changeImageEl.removeEventListener('submit', this.changeImageBindFunc);
            }

            this.changeImageEl = isQuerySelector(changeImageFormQs);
            this.changeImageFormEl = new ChangeImageForm(this.changeImageEl);
            this.changeImageEl.reset();
            this.changeImageEl.addEventListener('submit', this.changeImageBindFunc);
        }

        set registerForm(registerFormQs) {
            if (this.registerEl) {
                this.registerFormEl.removeListeners();
                this.registerEl.removeEventListener('submit', this.registerBindFunc);
            }

            this.registerEl = isQuerySelector(registerFormQs);
            this.registerFormEl = new RegistrationForm(this.registerEl);
            this.registerEl.reset();
            this.registerEl.addEventListener('submit', this.registerBindFunc);
        }

        set loginForm(loginFormQs) {
            if (this.loginEl) {
                this.loginFormEl.removeListeners();
                this.loginEl.removeEventListener('submit', this.loginBindFunction);
            }

            this.loginEl = isQuerySelector(loginFormQs);
            this.loginFormEl = new LoginForm(this.loginEl);
            this.loginEl.reset();
            this.loginEl.addEventListener('submit', this.loginBindFunction);
        }

        set logoutBtn(logoutBtnQs) {
            if (this.logoutBtnEl) {
                this.logoutBtnEl.removeEventListener('click', this.logoutBindFunc);
            }

            this.logoutBtnEl = isQuerySelector(logoutBtnQs);
            this.logoutBtnEl.addEventListener('click', this.logoutBindFunc);
        }

        checkAuth() {
            loadMe().then(
                (me) => {
                    console.log('me is ', me);
                    let imageSource = httpModule.baseUrl + '/files/' + me.image;

                    this.imageInProfile.setAttribute('src', imageSource); // avatar in profile

                    me.image = imageSource;
                    this.userFooter.data = me; // avatar in drop-down menu
                    this.userFooter.render();
                    this.logoutBtn = '.' + this.logoutClassQs;
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.userFooter.clear();
                }
            );
        }

        changeImage(evt) {

            evt.preventDefault();

            const formData = this.changeImageFormEl.prepare();

            if (!formData) {
                return;
            }

            changeImage(formData).then(
                (response) => {
                    console.log(response);
                    this.changeImageEl.reset();

                    const imageInDownMenu = document.getElementById('imageInDownMenu');
                    this.imageInProfile.setAttribute('src', httpModule.baseUrl + '/files/' + response.fileName);
                    imageInDownMenu.setAttribute('src', httpModule.baseUrl + '/files/' + response.fileName);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.changeImageEl.reset();
                    alert('Неверно!!!');
                }
            );
        }

        changeProfile(evt) {
            evt.preventDefault();

            const formData = this.changeProfileFormEl.prepare();

            if (!formData) {
                return;
            }

            changeProfile(formData).then(
                (response) => {
                    console.log(response);
                    this.checkAuth();
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.changeProfileEl.reset();
                    alert('Неверно!');
                }
            );
        }

        login(evt) {
            evt.preventDefault();

            const formData = this.loginFormEl.prepare();

            if (!formData) {
                return;
            }

            loginUser(formData).then(
                (response) => {
                    console.log(response);
                    this.checkAuth();
                    sectionManager.openSection('menu');
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.loginEl.reset();
                    alert('Неверно!');
                }
            );
        }

        register(evt) {
            evt.preventDefault();

            const formData = this.registerFormEl.prepare();

            if (!formData) {
                return;
            }

            registerUser(formData).then(
                (response) => {
                    console.log(response);
                    this.checkAuth();
                    sectionManager.openSection('menu');
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this.registerEl.reset();
                    alert('Неверно!');
                }
            );
        }

        logout(evt) {
            evt.preventDefault();

            logoutUser().then(
                (response) => {
                    console.log(response);
                    this.checkAuth();
                    sectionManager.openSection('menu');
                }
            ).catch(
                (err) => {
                    console.log(err);
                    alert('Не удалось выйти из аккаунта. Проверьте соединение.');
                }
            );
        }
    }

    window.User = User;

})();