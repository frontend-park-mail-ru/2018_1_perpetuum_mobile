/**
 * @module controller/gameController
 */

/** @typedef {object} Event */

import {GameView} from '../Views/GameView/gameView.js';
import {LevelView} from '../Views/LevelView/levelView.js';
import {OfflineGameModel} from '../Models/game/offlineGameModel.js';
import {bus} from '../Modules/bus.js';
import {PaginatorModule} from '../Modules/paginator.js';
import {sharedData} from '../Modules/sharedData.js';

/**
 * The class which connects functionality of game Model and View via proxy-functions.
 * Also now implements game logic.
 */
class OfflineGameController {

    /**
     * Create and link game Views with proxy-functions.
     */
    constructor() {
        this.levelView = new LevelView();
        this.gameViewOffline  = new GameView();
        this.gameModel = new OfflineGameModel();

        this.paginator = new PaginatorModule();

        this.gameViewOffline.setCubic = this.setCubic.bind(this);
        this.gameViewOffline.openLevel = this.openLevel.bind(this);

        this.levelView.getLevels = this.getLevels.bind(this);
        this.levelView.onPaginatorLeft = this.onPaginatorLeft.bind(this);
        this.levelView.onPaginatorRight = this.onPaginatorRight.bind(this);
        this.initLevelsPaginator();

        bus.on("authorized", this.sendGameProgress.bind(this));
    }

    /**
     * Control setting the cubic.
     * Proxy to gameModel.setCubic {@link module:models/game/offlineGameModel} + check for game to end.
     * @param {Object} cubic - The cubic instance.
     * @return {OfflineGameController} The current object instance.
     */
    setCubic(cubic) {
        const setRight = this.gameModel.setCubic(cubic);
        if (setRight && this.gameModel.currentProgress >= this.gameModel.vacantCubes) {
            this.endGame();
        }
        return this;
    }

    /**
     * End the game.
     * Invoke popup with game results and save progress.
     * @return {OfflineGameController} The current object instance.
     */
    endGame() {
        this.gameViewOffline.gameOnWin();
        this.gameModel.currentProgress = 0;
        this.gameModel.currentProgress = 0;
        this.gameModel.addGameProgress( {time : this.gameViewOffline.timeNowSec} );
        this.sendGameProgress();
        return this;
    }

    /**
     * Send game progress to server.
     */
    sendGameProgress() {
        if (navigator.onLine && sharedData.data['currentUser'] && this.gameModel.gameProgress.length !== 0) {
            this.gameModel.sendGameProgress();
        }
    }

    /**
     * Open the game level.
     * @param {object<page number>} mapNum - The level number to open.
     */
    openLevel(mapNum = { page : 1 }) {
        this.gameModel.getMap(mapNum).then(
            (data) => {
                bus.emit('game', [data, `/${mapNum.page}`]);
            }
        )
    }

    /**
     * Initialize pagination over levels.
     * TODO EXCLUDE HARDCODED levelsCount - GET IT FROM SERVER, NOW IT IS SO ONLY FOR DEMONSTRATION
     */
    initLevelsPaginator() {
        this.paginator.levelsCount = 10;
        this.paginator.levelsOnPage = 6;
        this.paginator.maxPageNum = Math.ceil(this.paginator.levelsCount / this.paginator.levelsOnPage);
    }

    /**
     * Download all maps in the page
     * (for preview in the page and caching in service worker)
     * and then open the page.
     * @param {object<page number>} levelPage The page number to open in levels overview.
     */
    getLevels(levelPage = { page : 1 }) {
        const levels = {
            from : (levelPage.page - 1) * this.paginator.levelsOnPage + 1,
            to : Math.min(levelPage.page * this.paginator.levelsOnPage, this.paginator.levelsCount)
        };
        const promises = [];
        for (let i = levels.from; i <= levels.to; i++) {
            promises.push(this.gameModel.getMap({ mapNum : i }).then(map => {
                map['number'] = i;
                return map;
            }));
        }
        Promise.all(promises).then(maps => {
            this.paginator.pageNum = levelPage.page;
            const data = {
                maps: maps,
                paginator: this.paginator
            };
            bus.emit('level', [data, `/${levelPage.page}`])
        })
    }

    /**
     * Turn back the page of levels overview.
     * @param {Event} evt - The event signalized turning one page back.
     */
    onPaginatorLeft(evt) {
        evt.preventDefault();

        const mapNum = {
            page: this.paginator.decrement()
        };

        this.getLevels(mapNum);
    }

    /**
     * Turn next the page of levels overview.
     * @param {Event} evt - The event signalized turning one page back.
     */
    onPaginatorRight(evt) {
        evt.preventDefault();

        const mapNum = {
            page: this.paginator.increment()
        };

        this.getLevels(mapNum);
    }

}

export {OfflineGameController};