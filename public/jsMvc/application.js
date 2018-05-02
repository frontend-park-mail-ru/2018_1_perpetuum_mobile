/**
 * Blendocu.
 * SPA of colours.
 */

import {OnlineGameController} from './Controller/gameOnlineController';

/**
 * for webpack. require all css file in directory
 * @param r - callback
 */
function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('./../css/', true, /\.(css)$/));


import {Router} from './Modules/router.js';
import {OfflineGameController} from './Controller/gameController.js';
import {UserController} from './Controller/userController.js';
import {ScoreboardController} from './Controller/scoreboardController.js';
import {enableSW} from './Modules/serviceWorker.js';




if (
    window.location.hostname === 'blendocu.herokuapp.com'
    && window.location.protocol !== 'https:'
) {
    window.location.assign(window.location.href.replace('http://', 'https://'));
    //return;
}


/**
 * disable right mouse button
 */
window.addEventListener('contextmenu', evt => {
    evt.preventDefault();
    evt.stopPropagation();
    return false;
});


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
    const onlineGameController = new OnlineGameController();

    /**
     * Connect all paths to its views and aliases.
     */
    router.add('/multiPlayer', onlineGameController.gameView, 'onlineGame');
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
