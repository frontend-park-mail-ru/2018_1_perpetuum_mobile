/**
 * @module controller/gameOnlineController
 */

/*
import {GameView} from '../Views/GameView/gameView.js';
import {bus} from '../Modules/bus.js';


class OnlineGameController {
    constructor() {
        this.gameViewOnline  = new GameView();

        this.gameViewOnline.gameEvent = this.gameEvent.bind(this);
    }

    init(mode) {
        let GameConstructor = null;

        switch (mode) {
            case GAME_MODES.ONLINE: {
                GameConstructor = OnlineGame;
                break;
            }
            case GAME_MODES.OFFLINE: {
                GameConstructor = OfflineGame;
                break;
            }
            default:
                throw new Error('Invalid game mode ' + mode);
        }
        this.gameCore = new GameConstructor();
        this.start();
    }

    start() {
        this.gameCore.start();
    }

    destroy() {
        this.gameCore.destroy();
    }

    gameEvent(evt, params) {
        switch (evt) {
            case GAME_EVENTS.SET_CUBIC: {
                this.gameCore.setCubic(params);
                break;
            }
            default:
                throw new Error('Invalid event type ' + evt);
        }
    }
}

export {OnlineGameController};


setCubic(cubic) {
    const canISet = this.gameModel.setCubic(cubic);
    if (canISet && this.gameModel.currentProgress >= this.gameModel.vacantCubes) {
        this.endGame();
    }
    return canISet;
}

endGame() {
    bus.emit('menu');
}

*/