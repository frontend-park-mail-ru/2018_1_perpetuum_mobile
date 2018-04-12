import {GameView} from '../Views/GameView/gameView.js';
import {LevelView} from '../Views/LevelView/levelView.js';
import {OfflineGameModel} from '../Models/game/offlineGameModel.js';
import {bus} from '../Modules/bus.js';
import {PaginatorModule} from '../Modules/paginator.js';


class OfflineGameController {
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
    }

    setCubic(cubic) {
        const setRight = this.gameModel.setCubic(cubic);
        if (setRight && this.gameModel.currentProgress >= this.gameModel.vacantCubs) {
            this.endGame();
        }
        return this;
    }

    endGame() {
        this.gameViewOffline.gameOnWin();
        return this;
    }

    openLevel(mapNum = { page : 1 }) {
        this.gameModel.getMap(mapNum).then(
            (data) => {
                bus.emit('game', [data, `/${mapNum.page}`]);
            }
        )
    }

    initLevelsPaginator() {

        this.paginator.levelsCount = 10;
        this.paginator.levelsOnPage = 6;
        this.paginator.maxPageNum = Math.ceil(this.paginator.levelsCount / this.paginator.levelsOnPage);
    }

    getLevels(levelPage = { page : 1 }) {
        const levels = { from : (levelPage.page - 1) * this.paginator.levelsOnPage + 1, to : Math.min(levelPage.page * this.paginator.levelsOnPage, this.paginator.levelsCount) };
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
     * Turn back the page.
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
     * Turn next the page.
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