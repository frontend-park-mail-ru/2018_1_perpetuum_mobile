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
            this._logoutClass = 'logoutForm';
            this._userFooter = new UserFooterComponent(isQuerySelector('.profile'));
            this._userFooter.logoutClass = this._logoutClass;

            this._loginBindFunction = this.login.bind(this);
            this._registerBindFunc = this.register.bind(this);
            this._logoutBindFunc = this.logout.bind(this);
            this._changeImageBindFunc = this.changeImage.bind(this);
            this._changeProfileBindFunc = this.changeProfile.bind(this);
            this._imageInProfile = document.getElementById('imageInProfile');
        }

        set changeProfileForm(changeProfileFormQs) {
            if (this._changeProfileEl) {
                this._changeProfileForm.removeListeners();
                this._changeProfileEl.removeEventListener('submit', this._changeProfileBindFunc);
            }


            this._changeProfileEl = isQuerySelector(changeProfileFormQs);
            this._changeProfileForm = new ChangeProfileForm(this._changeProfileEl);
            this._changeProfileEl.reset();
            this._changeProfileEl.addEventListener('submit', this._changeProfileBindFunc);
        }


        set changeImageForm(changeImageFormQs) {
            if (this._changeImageEl) {
                this._changeImageForm.removeListeners();
                this._changeImageEl.removeEventListener('submit', this._changeImageBindFunc);
            }

            this._changeImageEl = isQuerySelector(changeImageFormQs);
            this._changeImageForm = new ChangeImageForm(this._changeImageEl);
            this._changeImageEl.reset();
            this._changeImageEl.addEventListener('submit', this._changeImageBindFunc);
        }

        set registerForm(registerFormQs) {
            if (this._registerEl) {
                this._registerForm.removeListeners();
                this._registerEl.removeEventListener('submit', this._registerBindFunc);
            }

            this._registerEl = isQuerySelector(registerFormQs);
            this._registerForm = new RegistrationForm(this._registerEl);
            this._registerEl.reset();
            this._registerEl.addEventListener('submit', this._registerBindFunc);
        }

        set loginForm(loginFormQs) {
            if (this._loginEl) {

                this._loginForm.removeListeners();
                this._loginEl.removeEventListener('submit', this._loginBindFunction);
            }

            this._loginEl = isQuerySelector(loginFormQs);
            this._loginForm = new LoginForm(this._loginEl);
            this._loginEl.reset();
            this._loginEl.addEventListener('submit', this._loginBindFunction);
        }

        set logoutBtn(logoutBtnQs) {
            if (this._logoutBtn) {
                this._logoutBtn.removeEventListener('click', this._logoutBindFunc);
            }

            this._logoutBtn = isQuerySelector(logoutBtnQs);
            this._logoutBtn.addEventListener('click', this._logoutBindFunc);
        }

        checkAuth() {
            loadMe().then(
                (me) => {
                    console.log('me is ', me);
                    let imageSource = httpModule.baseUrl + '/files/' + me.image;

                    this._imageInProfile.setAttribute('src', imageSource); // avatar in profile

                    me.image = imageSource;
                    this._userFooter.data = me; // avatar in drop-down menu
                    this._userFooter.render();
                    this.logoutBtn = '.' + this._logoutClass;
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this._userFooter.clear();
                }
            );
        }

        changeImage(evt) {

            evt.preventDefault();

            const formData = this._changeImageForm.prepare();

            if (!formData) {
                return;
            }

            changeImage(formData).then(
                (response) => {
                    console.log(response);
                    this._changeImageEl.reset();

                    const imageInDownMenu = document.getElementById('imageInDownMenu');
                    this._imageInProfile.setAttribute('src', httpModule.baseUrl + '/files/' + response.fileName);
                    imageInDownMenu.setAttribute('src', httpModule.baseUrl + '/files/' + response.fileName);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this._changeImageEl.reset();
                    alert('Неверно!!!');
                }
            );
        }

        changeProfile(evt) {
            evt.preventDefault();

            const formData = this._changeProfileForm.prepare();

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
                    this._changeProfileEl.reset();
                    alert('Неверно!');
                }
            );
        }

        login(evt) {
            evt.preventDefault();

            const formData = this._loginForm.prepare();

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
                    this._loginEl.reset();
                    alert('Неверно!');
                }
            );
        }

        register(evt) {
            evt.preventDefault();

            const formData = this._registerForm.prepare();

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
                    this._registerEl.reset();
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