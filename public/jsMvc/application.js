import {Router} from './Modules/router.js';
import {MenuView} from './Views/MenuView/menuView.js';
import {UserController} from './Controller/userController.js';

document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementsByClassName('wrapper-block__main')[0];
    const router = new Router(root);

    const userController = new UserController();

    router.add('/login', userController.loginView);
    router.add('/profile', userController.profileView);
    router.add('/register', userController.registerView);
    router.add('/', userController.profileView);
    router.start();
});