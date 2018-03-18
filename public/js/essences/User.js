(function () {

    const UserFooter = window.UserFooterComponent;

    const HttpModule = window.HttpModule;
/*    const ChangeProfileNickForm = window.ChangeProfileNickForm;
    const ChangePasswordForm = window.ChangePasswordForm;
    const ChangeImageForm = window.ChangeImageForm;*/
    const RegistrationForm = window.RegistrationForm;
    const LoginForm = window.LoginForm;

    const httpModule = new HttpModule();

    function changePassword(data) {
        return httpModule.doPostFetch({url: httpModule.baseUrl + '/settings', data: data});
    }

    function changeProfileNick(data) {
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
            this._changePasswordBindFunc = this.changePassword.bind(this);
            this._changeProfileNickBindFunc = this.changeProfileNick.bind(this);
        }

        set changeProfileNickForm(changeProfileNickFormQs) {
            if (this._changeProfileNickEl) {
                //this._changeProfileNickForm.removeListener();
                this._changeProfileNickEl.removeEventListener('submit', this._changeProfileNickBindFunc);
            }

            //this._changeProfileNickForm = new ChangeProfileNickForm(changeProfileNickFormQs);
            this._changeProfileNickEl = isQuerySelector(changeProfileNickFormQs);
            this._changeProfileNickEl.reset();
            this._changeProfileNickEl.addEventListener('submit', this._changeProfileNickBindFunc);
        }

        set changePasswordForm(changePasswordFormQs) {
            if (this._changePasswordEl) {
                //this._changePasswordForm.removeListeners();
                this._changePasswordEl.removeEventListener('submit', this._changePasswordBindFunc);
            }

            //this._changePasswordForm = new ChangePasswordForm(changePasswordFormQs);
            this._changePasswordEl = isQuerySelector(changePasswordFormQs);
            this._changePasswordEl.reset();
            this._changePasswordEl.addEventListener('submit', this._changePasswordBindFunc);
        }

        set changeImageForm(changeImageFormQs) {
            if (this._changeImageEl) {
                //this._changeImageForm.removeListeners();
                this._changeImageEl.removeEventListener('submit', this._changeImageBindFunc);
            }

            //this._changeImageForm = new ChangeImageForm(changeLoginFormQs);
            this._changeImageEl = isQuerySelector(changeImageFormQs);
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
                console.log('disable login listeners');
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

                    imageInProfile.setAttribute('src', imageSource); // avatar in profile

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

            function getTypeFromMimeType(mimeTypeName) {
                const slashPosition = mimeTypeName.lastIndexOf('/');
                if (slashPosition === -1) {
                    this._changeImageEl.reset();
                    throw Error('Неподдерживаемый тип файла');
                }
                return mimeTypeName.substring(slashPosition + 1);

            }

            evt.preventDefault();

            const selectedImage = this._changeImageEl.getElementsByClassName('js-upload-image')[0].files[0];
            const selectedImageMimeType = selectedImage.type;

            if (selectedImageMimeType !== 'image/jpg' && selectedImageMimeType !== 'image/jpeg' && selectedImageMimeType !== 'image/png') {
                try {
                    let selectedImageType = getTypeFromMimeType(selectedImageMimeType);
                    alert('Тип файла \"' + selectedImageType + '\" не поддерживается. ' +
                        'Допустимые форматы данных: \"jpg\", \"jpeg\", \"png\". ');
                } catch(e) {
                    alert(e.name + ': ' + e.message);
                } finally {
                    this._changeImageEl.reset();
                }
                return;
            }

            const selectedImageSizeB = selectedImage.size;
            const selectedImageSizeMB = selectedImageSizeB / 1024 / 1024;

            const maxImageSizeMB = 2;
            const maxImageSizeB = maxImageSizeMB * 1024 * 1024;

            if (selectedImageSizeB > maxImageSizeB) {
                alert('Размер изображения слишком велик: ' + selectedImageSizeMB.toFixed(2) + ' MB.\n' +
                    'Выберите изображение, размер которого меньше 2 MB.');
                this._changeImageEl.reset();
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedImage);

            changeImage(formData).then(
                (response) => {
                    console.log(response);
                    this._changeImageEl.reset();

                    const imageInDownMenu = document.getElementById('imageInDownMenu');
                    imageInProfile.setAttribute('src', httpModule.baseUrl + '/files/' + response.fileName);
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

        changePassword(evt) {
            evt.preventDefault();
            const fields = ['oldPassword', 'newPassword'];

            const form = evt.currentTarget;
            const formElements = form.elements;

            const formData = reduceWithValues(formElements, fields);

            changePassword(formData).then(
                (response) => {
                    console.log(response);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this._changePasswordEl.reset();
                    alert('Неверно!');
                }
            );
        }

        changeProfileNick(evt) {
            evt.preventDefault();
            const fields = ['login', 'email'];

            const form = evt.currentTarget;
            const formElements = form.elements;

            const formData = reduceWithValues(formElements, fields);

            changeProfileNick(formData).then(
                (response) => {
                    console.log(response);
                    this.checkAuth();
                }
            ).catch(
                (err) => {
                    console.log(err);
                    this._changeProfileNickEl.reset();
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

            console.info('Authorization: ', formData);

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