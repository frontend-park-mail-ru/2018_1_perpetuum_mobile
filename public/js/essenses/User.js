(function () {


    const HttpModule = window.HttpModule;
/*    const ChangeProfileNickForm = window.ChangeProfileNickForm;
    const ChangePasswordForm = window.ChangePasswordForm;
    const ChangeLoginForm = window.ChangeLoginForm;*/
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

    function loadAllUsers(data) {
        return httpModule.doPostFetch({url: httpModule.baseUrl + '/users', data: data});
    }

    function loadMe() {
        return httpModule.doGetFetch({url: httpModule.baseUrl + '/me'});
    }


    class User {


        set changeProfileNickForm(changeProfileNickFormQs) {
            if (this._changeProfileNickEl) {
                //this._changeProfileNickForm.removeListener();
                this._changeProfileNickEl.removeEventListener('submit', this.changeProfileNick);
            }

            //this._changeProfileNickForm = new ChangeProfileNickForm(changeProfileNickFormQs);
            this._changeProfileNickEl = isQuerySelector(changeProfileNickFormQs);
            this._changeProfileNickEl.reset();
            this._changeProfileNickEl.addEventListener('submit', this.changeProfileNick.bind(this));
        }

        set changePasswordForm(changePasswordFormQs) {
            if (this._changePasswordEl) {
                //this._changePasswordForm.removeListeners();
                this._changePasswordEl.removeEventListener('submit', this.changePassword);
            }

            //this._changePasswordForm = new ChangePasswordForm(changePasswordFormQs);
            this._changePasswordEl = isQuerySelector(changePasswordFormQs);
            this._changePasswordEl.reset();
            this._changePasswordEl.addEventListener('submit', this.changePassword.bind(this));
        }

        set changeImageForm(changeImageFormQs) {
            if (this._changeImageEl) {
                //this._changeImageForm.removeListeners();
                this._changeImageEl.removeEventListener('submit', this.changeProfileNick);
            }

            //this._changeImageForm = new ChangeImageForm(changeLoginFormQs);
            this._changeImageEl = isQuerySelector(changeImageFormQs);
            this._changeImageEl.reset();
            this._changeImageEl.addEventListener('submit', this.changeImage.bind(this));
        }

        set registerForm(registerFormQs) {
            if (this._registerEl) {
                this._registerForm.removeListeners();
                this._registerEl.removeEventListener('submit', this.register);
            }

            this._registerEl = isQuerySelector(registerFormQs);
            this._registerForm = new RegistrationForm(this._registerEl);
            this._registerEl.reset();
            this._registerEl.addEventListener('submit', this.register.bind(this));
        }

        set loginForm(loginFormQs) {
            if (this._loginEl) {
                this._loginForm.removeListeners();
                this._loginEl.removeEventListener('submit', this.login);
            }

            this._loginEl = isQuerySelector(loginFormQs);
            this._loginForm = new LoginForm(this._loginEl);
            this._loginEl.reset();
            this._loginEl.addEventListener('submit', this.login.bind(this));
        }

        set logoutBtn(logoutBtnQs) {
            if (this._logoutBtn) {
                this._logoutBtn.removeEventListener('click', this.logout);
            }

            this._logoutBtn = isQuerySelector(logoutBtnQs);
            this._logoutBtn.addEventListener('click', this.logout.bind(this));
        }

        changeImage(evt) {

            function getTypeFromMimeType(mimeTypeName) {
                const slashPosition = mimeTypeName.lastIndexOf('/');
                if (slashPosition === -1)
                    throw Error('Неподдерживаемый тип файла');
                return mimeTypeName.substring(slashPosition + 1);

            }

            evt.preventDefault();

            const selectedImage = changeImageButton.files[0];
            const selectedImageMimeType = selectedImage.type;

            if (selectedImageMimeType !== 'image/jpg' && selectedImageMimeType !== 'image/jpeg' && selectedImageMimeType !== 'image/png') {
                try {
                    let selectedImageType = getTypeFromMimeType(selectedImageMimeType);
                    alert('Тип файла \"' + selectedImageType + '\" не поддерживается. ' +
                        'Допустимые форматы данных: \"jpg\", \"jpeg\", \"png\". ');
                } catch(e) {
                    alert(e.name + ': ' + e.message);
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
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedImage);

            changeImage(formData).then(
                (response) => {
                    console.log(response);
                    changeImageForm.reset();

                    const imageInDownMenu = document.getElementById('imageInDownMenu');
                    imageInProfile.setAttribute('src', httpModule.baseUrl + '/files/' + response.fileName);
                    imageInDownMenu.setAttribute('src', httpModule.baseUrl + '/files/' + response.fileName);
                }
            ).catch(
                (err) => {
                    console.log(err);
                    changeImageForm.reset();
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
                    changePasswordForm.reset();
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
                    checkAuth();
                }
            ).catch(
                (err) => {
                    console.log(err);
                    changeProfileNickForm.reset();
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
                    checkAuth();
                    sectionManager.openSection('menu');
                }
            ).catch(
                (err) => {
                    console.log(err);
                    loginForm.reset();
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
                    checkAuth();
                    sectionManager.openSection('menu');
                }
            ).catch(
                (err) => {
                    console.log(err);
                    registrationForm.reset();
                    alert('Неверно!');
                }
            );
        }

        logout(evt) {
            evt.preventDefault();

            logoutUser().then(
                (response) => {
                    console.log(response);
                    checkAuth();
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