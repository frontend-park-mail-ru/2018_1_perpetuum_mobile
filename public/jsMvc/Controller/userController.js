'use strict';

/**
 * @module controller/userController
 */

/** @typedef {object} Event */

import {ProfileView} from '../Views/ProfileView/profileView.js';
import {LoginView} from '../Views/LoginView/loginView.js';
import {RegisterView} from '../Views/RegisterView/registerView.js';
import {MenuView} from '../Views/MenuView/menuView.js';
import {AboutView} from '../Views/AboutView/aboutView.js';

import {UserModel} from '../Models/userModel.js';

import {reduceWithValues} from '../Modules/basic.js';

import {bus} from '../Modules/bus.js';
import {baseUrl} from '../Modules/HttpModule.js';

import {sharedData} from '../Modules/sharedData.js';
import {API} from './API/api.js';
import {ResetView} from '../Views/ResetView/resetView.js';


/**
 * The class which connects functionality of user Model and View via proxy-functions.
 */
class UserController {

    /**
     * Create and link user Views with proxy-functions.
     */
    constructor() {
        this.resetView = new ResetView();
        this.loginView = new LoginView();
        this.registerView = new RegisterView();
        this.profileView = new ProfileView();
        this.menuView = new MenuView();
        this.aboutView = new AboutView();

        this.userModel = new UserModel();

        this.loginView.onLogin = this.login.bind(this);

        this.registerView.onRegister = this.register.bind(this);

        this.profileView.onChangePassword = this.changePassword.bind(this);
        this.profileView.onChangeLogin = this.changeLogin.bind(this);
        this.profileView.onChangeEmail = this.changeEmail.bind(this);
        this.profileView.onChangeImage = this.changeImage.bind(this);
        this.profileView.onLogout = this.logout.bind(this);
        this.resetView.onReset = this.reset.bind(this);

        this.menuView.onLogout = this.logout.bind(this);

        this.createApi();
    }

    /**
     * Change user avatar.
     * Extract the image from html form and send it through user Model {@link } to server.
     * @param {Event} evt - The form event signalized form is filled and valid.
     */
    changeImage(evt) {
        evt.preventDefault();

        const imageForm = evt.target;

        const data = new FormData();
        data.append('file', imageForm.files[0]);

        this.userModel.changeImage(data).then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('reload');
                });
            }
        ).catch(
            (err) => {
                bus.emit('changeImage-err', [err.message]);
            }
        );
    }

    /**
     * Change user login.
     * Extract the new login and old password from html form and
     * send it through user Model {@link module:models/userModel} to server.
     * @param {Event} evt - The form event signalized form is filled and valid.
     */
    changeLogin(evt) {
        evt.preventDefault();

        const form = evt.target;

        const fields = ['login', 'oldPassword'];

        const data = reduceWithValues(form.elements, fields);

        this.userModel.changeProfile(data).then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('reload');
                });
            }
        ).catch(
            (err) => {
                bus.emit('changeProfileForm-err', [err.message]);
            }
        );
    }

    /**
     * Change user password.
     * Extract the new password and old password from html form and
     * send it through user Model {@link module:models/userModel} to server.
     * @param {Event} evt - The form event signalized form is filled and valid.
     */
    changePassword(evt) {
        evt.preventDefault();

        const form = evt.target;

        const fields = ['newPassword', 'oldPassword'];

        const data = reduceWithValues(form.elements, fields);

        this.userModel.changeProfile(data).then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('reload');
                });
            }
        ).catch(
            (err) => {
                bus.emit('changeProfileForm-err', [err.message]);
            }
        );
    }

    /**
     * Change user email.
     * Extract the new email and old password from html form and
     * send it through user Model {@link module:models/userModel} to server.
     * @param {Event} evt - The form event signalized form is filled and valid.
     */
    changeEmail(evt) {
        evt.preventDefault();

        const form = evt.target;

        const fields = ['email', 'oldPassword'];

        const data = reduceWithValues(form.elements, fields);

        this.userModel.changeProfile(data).then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('reload');
                });
            }
        ).catch(
            (err) => {
                bus.emit('changeProfileForm-err', [err.message]);
            }
        );
    }

    /**
     * Authorize user.
     * Extract the email and password from html form and
     * send it through user Model {@link module:models/userModel} to server.
     * @param {Event} evt - The form event signalized form is filled and valid.
     */
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
                    bus.emit('authorized');
                });
            }
        ).catch(
            (err) => {
                bus.emit('login-err', [err.message]);
            }
        );
    }

    /**
     * Reset user password.
     * @param {Event} evt - The form event signalized to reset password for email.
     */
    reset(evt) {
        evt.preventDefault();

        const form = evt.target;

        const fields = ['email'];

        const data = reduceWithValues(form.elements, fields);

        this.userModel.reset(data).then(
            data => {
                bus.emit('reset-resp', ['OK', data.message]);
            }
        ).catch(
            err => {
                bus.emit('reset-resp', ['ERR', err.message])
            }
        )
    }

    /**
     * Register new user.
     * Extract the email, login and password from html form and
     * send it through user Model {@link module:models/userModel} to server.
     * @param {Event} evt - The form event signalized form is filled and valid.
     */
    register(evt) {
        evt.preventDefault();

        const form = evt.target;

        const fields = ['login', 'email', 'password'];

        const data = reduceWithValues(form.elements, fields);

        this.userModel.register(data).then(
            response => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('menu');
                    bus.emit('authorized');
                });
            }
        ).catch(
            (err) => {
                bus.emit('register-err', [err.message]);
            }
        );
    }

    /**
     * Logout user.
     * Send logout signal through user Model {@link module:models/userModel} to server.
     * @param {Event} evt - The form event signalized form is filled and valid.
     */
    logout(evt) {
        evt.preventDefault();

        this.userModel.logout().then(
            (response) => {
                console.log(response);
                this.loadMe().then(() => {
                    bus.emit('menu');
                    bus.emit('unauthorized');
                });
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    }

    /**
     * Load user.
     * Load user info and save it to shared data. {@link module:modules/sharedData}
     * @return {Promise<object>}
     */
    loadMe() {
        return this.userModel.loadMe().then(
            (me) => {
                console.log('me is ', me);
                sharedData.add('currentUser', {
                    image: `${baseUrl}/files/${me.image}`,
                    login: me.login,
                    email: me.email,
                    score: me.score,
                    token: me.token
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                sharedData.del('currentUser');
            }
        );
    }

    /**
     * Create user api for all other controllers to use.
     */
    createApi() {
        bus.on(API.LOGOUT, this.logout.bind(this));
    }
}

export {UserController};