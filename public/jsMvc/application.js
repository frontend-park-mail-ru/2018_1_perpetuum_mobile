/**
 * Blendocu.
 * SPA of colours.
 */

import {Router} from './Modules/router.js';
import {OfflineGameController} from './Controller/gameController.js';
import {UserController} from './Controller/userController.js';
import {ScoreboardController} from './Controller/scoreboardController.js';

import {enableSW} from './Modules/serviceWorker.js';


/**
 * When all DOM is loaded starts app.
 */
document.addEventListener('DOMContentLoaded', () => {
    enableSW();
    const root = document.getElementsByClassName('js-application')[0];
    const router = new Router(root);

    const userController = new UserController();
    const scoreboardController = new ScoreboardController();
    const offlineGameController = new OfflineGameController();

    /**
     * Connect all paths to its views and aliases.
     */
    router.add('/game', offlineGameController.gameViewOffline, 'game');
    router.add('/level', offlineGameController.levelView, 'level');
    router.add('/scoreboard', scoreboardController.scoreboardView, 'scoreboard');
    router.add('/login', userController.loginView, 'login');
    router.add('/profile', userController.profileView, 'profile');
    router.add('/register', userController.registerView, 'register');
    router.add('/about', userController.aboutView, 'about');
    router.add('/', userController.menuView, 'menu');

    /**
     * Load user info and start the application.
     */
    userController.loadMe().then(() => {
        router.start();
    });
});