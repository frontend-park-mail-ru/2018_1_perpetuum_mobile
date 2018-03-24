import {ProfileView} from '../Views/ProfileView/ProfileView';
import {LoginView} from '../Views/LoginView/LoginView';
import {RegisterView} from '../Views/RegisterView/RegisterView';

import {UserModel} from '../Models/userModel';

import {bus} from '../Modules/bus';

class userController {
    constructor() {
        this.loginView = new LoginView();
        this.registerView = new RegisterView();
        this.profileView = new ProfileView();

        this.userModel = new UserModel();
    }

    changeImage(evt) {
        evt.preventDefault();

        this.userModel.changeImage(data).then(
            (response) => {
                console.log(response);
                /*this.changeImageEl.reset();

                const imageInDownMenu = document.getElementsByClassName('js-profile-footer__avatar')[0];
                this.imageInProfile.setAttribute('src', httpModule.baseUrl + '/files/' + response.fileName);
                imageInDownMenu.setAttribute('src', httpModule.baseUrl + '/files/' + response.fileName);*/
            }
        ).catch(
            (err) => {
                console.log(err);
                /*this.changeImageEl.reset();
                alert('Неверно!!!');*/
            }
        );
    }

    changeProfile(evt) {
        evt.preventDefault();

        this.userModel.changeProfile(data).then(
            (response) => {
                console.log(response);
                /*this.checkAuth();*/
            }
        ).catch(
            (err) => {
                console.log(err);
                /*this.changeProfileEl.reset();
                alert('Неверно!');*/
            }
        );
    }

    login(evt) {
        evt.preventDefault();

        const form = evt.target.form;

        const fields = ['email', 'password'];

        const data = reduceWithValues(form.elements, fields);

        this.userModel.login(data).then(
            (response) => {
                console.log(response);
                /*this.checkAuth();
                sectionManager.openSection('menu');*/
            }
        ).catch(
            (err) => {
                console.log(err);
                /*form.reset();
                alert('Неверно!');*/
            }
        );
    }

    register(evt) {
        evt.preventDefault();

        this.userModel.register(data).then(
            (response) => {
                console.log(response);
                /*this.checkAuth();
                sectionManager.openSection('menu');*/
            }
        ).catch(
            (err) => {
                console.log(err);
                /*this.registerEl.reset();
                alert('Неверно!');*/
            }
        );
    }

    logout(evt) {
        evt.preventDefault();

        this.userModel.logout().then(
            (response) => {
                console.log(response);
                /*this.checkAuth();
                sectionManager.openSection('menu');*/
            }
        ).catch(
            (err) => {
                console.log(err);
                /*alert('Не удалось выйти из аккаунта. Проверьте соединение.');*/
            }
        );
    }

    loadMe() {
        this.userModel.loadMe().then(
            (me) => {
                console.log('me is ', me);
                /*const imageSource = `${httpModule.baseUrl}/files/${me.image}`;

                this.imageInProfile.setAttribute('src', imageSource); // avatar in profile

                me.image = imageSource;
                this.userFooter.data = me; // avatar in drop-down menu
                this.userFooter.render();
                this.logoutBtn = `.${this.logoutClassQs}`;*/
            }
        ).catch(
            (err) => {
                console.log(err);
                /*this.userFooter.clear();*/
            }
        );
    }

}