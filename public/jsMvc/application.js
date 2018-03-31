/**
 * Blendocu.
 * SPA of colours.
 */

import {Router} from './Modules/router.js';
import {UserController} from './Controller/userController.js';
import {ScoreboardController} from './Controller/scoreboardController.js';
import {LevelView} from './Views/LevelView/levelView.js';


/**
 * When all DOM is loaded starts app.
 */
document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementsByClassName('js-application')[0];
    const router = new Router(root);

    const userController = new UserController();
    const scoreboardController = new ScoreboardController();

    /**
     * Connect all paths to its views and aliases.
     */
    router.add('/level', new LevelView(), 'level');
    router.add('/scoreboard', scoreboardController.scoreboardView, 'scoreboard');
    router.add('/login', userController.loginView, 'login');
    router.add('/profile', userController.profileView, 'profile');
    router.add('/register', userController.registerView, 'register');
    router.add('/', userController.menuView, 'menu');

    /**
     * Load user info and start the application.
     */
    userController.loadMe().then(() => {
        router.start();
    });
});