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

        this.levelOverviewPaginator = new PaginatorModule();

        this.gameModel.currentProgress = 0;

        this.gameViewOffline.setCubic = this.setCubic.bind(this);
        this.gameViewOffline.openLevel = this.openLevel.bind(this);

        this.levelView.getLevels = this.getLevels.bind(this);
        this.levelView.onPaginatorLeft = this.onPaginatorLeft.bind(this);
        this.levelView.onPaginatorRight = this.onPaginatorRight.bind(this);
        this.initLevelsPaginator();
        window.addEventListener('online', this.initLevelsPaginator.bind(this)); // when online all levels are available
        window.addEventListener('offline', this.initLevelsPaginator.bind(this)); // when offline only downloaded levels are available

        bus.on('authorized', this.sendGameProgress.bind(this));
        window.addEventListener('online', this.sendGameProgress.bind(this));
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
                if (mapNum.page < this.levelOverviewPaginator.levelsCount) {
                    data['toNextLevel'] = function(evt) {
                        evt.preventDefault();
                        this.openLevel( { page : mapNum.page + 1 } )
                    }.bind(this)
                }
                bus.emit('game', [data, `/${mapNum.page}`]);
            }
        );
    }

    /**
     * Initialize pagination over levels.
     */
    initLevelsPaginator() {
        this.gameModel.levelCount.then(count => {
            this.levelOverviewPaginator.levelsCount = count
        });
        this.levelOverviewPaginator.levelsOnPage = 6;
        this.levelOverviewPaginator.maxPageNum = Math.ceil(this.levelOverviewPaginator.levelsCount / this.levelOverviewPaginator.levelsOnPage);
    }

    /**
     * Download all maps in the page
     * (for preview in the page and caching in service worker)
     * and then open the page.
     * @param {object<page number>} levelPage The page number to open in levels overview.
     */
    getLevels(levelPage = { page : 1 }) {
        this.initLevelsPaginator();
        const levels = {
            from : (levelPage.page - 1) * this.levelOverviewPaginator.levelsOnPage + 1,
            to : Math.min(levelPage.page * this.levelOverviewPaginator.levelsOnPage, this.levelOverviewPaginator.levelsCount)
        };
        const promises = [];
        for (let i = levels.from; i <= levels.to; i++) {
            promises.push(this.gameModel.getMap({ page : i }).then(map => {
                map['number'] = i;
                return map;
            }));
        }
        Promise.all(promises).then(maps => {
            this.levelOverviewPaginator.pageNum = levelPage.page;
            const data = {
                maps: maps,
                paginator: this.levelOverviewPaginator
            };
            bus.emit('level', [data, `/${levelPage.page}`]);
        });
    }

    /**
     * Turn back the page of levels overview.
     * @param {Event} evt - The event signalized turning one page back.
     */
    onPaginatorLeft(evt) {
        evt.preventDefault();

        const mapNum = {
            page: this.levelOverviewPaginator.decrement()
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
            page: this.levelOverviewPaginator.increment()
        };

        this.getLevels(mapNum);
    }

}

export {OfflineGameController};