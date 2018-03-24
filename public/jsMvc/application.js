import {Router} from './Modules/router.js';
import {LoginView} from './Views/LoginView/LoginView.js';
import {MenuView} from './Views/MenuView/menuView.js';
import {ProfileView} from './Views/ProfileView/profileView.js';
import {RegisterView} from './Views/RegisterView/registerView.js';

document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementsByClassName('wrapper-block__main')[0];
    const router = new Router(root);

    router.add('/login', LoginView);
    router.add('/profile', ProfileView);
    router.add('/registration', RegisterView);
    router.add('/', MenuView);
    router.start();
});