import {GameView} from '../Views/GameView/gameView.js';
import {OfflineGameModel} from '../Models/game/offlineGameModel.js';
import {bus} from '../Modules/bus.js';


class OfflineGameController {
    constructor() {
        this.gameViewOffline  = new GameView();
        this.gameModel = new OfflineGameModel();

        this.gameViewOffline.setCubic = this.setCubic.bind(this);
        this.gameViewOffline.openLevel = this.openLevel.bind(this);
    }

    setCubic(cubic) {
        const setRight = this.gameModel.setCubic(cubic);
        if (setRight && this.gameModel.currentProgress >= this.gameModel.vacantCubs) {
            this.endGame();
        }
        return this;
    }

    endGame() {
        bus.emit('menu');
        return this;
    }

    openLevel(mapNum = { mapNum : 1 }) {
        this.gameModel.getMap(mapNum).then(
            (data) => {
                bus.emit('game', [data, `/${mapNum.mapNum}`]);
            }
        )
    }

}

export {OfflineGameController};