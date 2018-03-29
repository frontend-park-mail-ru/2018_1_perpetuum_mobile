'use strict';
import {ProfileView} from '../Views/ProfileView/profileView.js';
import {LoginView} from '../Views/LoginView/LoginView.js';
import {RegisterView} from '../Views/RegisterView/registerView.js';
import {MenuView} from '../Views/MenuView/menuView.js';

import {UserModel} from '../Models/userModel.js';

import {reduceWithValues} from '../Modules/basic.js';

import {bus} from '../Modules/bus.js';
import {baseUrl} from '../Modules/HttpModule.js';

import {sharedData} from '../Modules/sharedData.js';


class UserController {
    constructor() {
        this.loginView = new LoginView();
        this.registerView = new RegisterView();
        this.profileView = new ProfileView();
        this.menuView = new MenuView();

        this.userModel = new UserModel();

        this.loginView.onLogin = this.login.bind(this);

        this.registerView.onRegister = this.register.bind(this);

        this.profileView.onChangePassword = this.changePassword.bind(this);
        this.profileView.onChangeLogin = this.changeLogin.bind(this);
        this.profileView.onChangeEmail = this.changeEmail.bind(this);
        this.profileView.onChangeImage = this.changeImage.bind(this);
        this.profileView.onLogout = this.logout.bind(this);

        this.menuView.onLogout = this.logout.bind(this);
    }

    changeImage(evt) {
        evt.preventDefault();

        const imageForm = evt.target;

        const data = new FormData();
        data.append('file', imageForm.files[0]);

        this.userModel.changeImage(data).then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('reload')
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                alert('Неверно!!!');
            }
        );
    }

    changeLogin(evt) {
        evt.preventDefault();

        const form = evt.target;

        const fields = ['login', 'oldPassword'];

        const data = reduceWithValues(form.elements, fields);

        this.userModel.changeProfile(data).then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('reload')
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                alert('Неверно!');
            }
        );
    }

    changePassword(evt) {
        evt.preventDefault();

        const form = evt.target;

        const fields = ['newPassword', 'oldPassword'];

        const data = reduceWithValues(form.elements, fields);

        this.userModel.changeProfile(data).then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('reload')
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                alert('Неверно!');
            }
        );
    }

    changeEmail(evt) {
        evt.preventDefault();

        const form = evt.target;

        const fields = ['email', 'oldPassword'];

        const data = reduceWithValues(form.elements, fields);

        this.userModel.changeProfile(data).then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('reload')
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                alert('Неверно!');
            }
        );
    }

    login(evt) {
        evt.preventDefault();
        const form = evt.target;

        const fields = ['email', 'password'];

        const data = reduceWithValues(form.elements, fields);

        this.userModel.login(data).then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('menu');
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                form.reset();
                alert('Неверно!');
            }
        );
    }

    register(evt) {
        evt.preventDefault();

        const form = evt.target;

        const fields = ['login', 'email', 'password'];

        const data = reduceWithValues(form.elements, fields);

        this.userModel.register(data).then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('menu');
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                form.reset();
                alert('Неверно!');
            }
        );
    }

    logout(evt) {
        evt.preventDefault();

        this.userModel.logout().then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('menu');
                });
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    }

    loadMe() {
        return this.userModel.loadMe().then(
            (me) => {
                console.log('me is ', me);
                sharedData.add('currentUser', {
                    image: `${baseUrl}/files/${me.image}`,
                    login: me.login,
                    email: me.email,
                    score: me.score
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                sharedData.del('currentUser');
            }
        );
    }

}

export {UserController};