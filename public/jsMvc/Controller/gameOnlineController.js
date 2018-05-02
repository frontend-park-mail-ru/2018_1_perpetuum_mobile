/**
 * @module controller/gameOnlineController
 */
import {ws} from '../Modules/ws.js';
import {CLIENT_EVENTS} from '../Modules/game/serverEvents.js';
import {SERVER_EVENTS} from '../Modules/game/serverEvents.js';
import {bus} from '../Modules/bus.js';
import {OnlineGameModel} from '../Models/game/onlineGameModel.js';
import {OnlineGameView} from '../Views/OnlineGameView/onlineGameView.js';
import template from './../Views/OnlineGameView/onlineGameView.tmpl.xml';


class OnlineGameController {
    constructor() {
        this.gameView = new OnlineGameView(template);
        this.gameModel = new OnlineGameModel();
        this.ws = ws;

        this.onGameStarted = this.onGameStarted.bind(this);
        this.onCubicTaken = this.onCubicTaken.bind(this);
        this.onCubicSet = this.onCubicSet.bind(this);
        this.onUpdateScore = this.onUpdateScore.bind(this);
        this.onEndGame = this.onEndGame.bind(this);
    }

    startGame() {
        bus.on(SERVER_EVENTS.START_GAME, this.onGameStarted);
        bus.on(SERVER_EVENTS.CUBIC_TAKEN, this.onCubicTaken);
        bus.on(SERVER_EVENTS.CUBIC_SET, this.onCubicSet);
        bus.on(SERVER_EVENTS.UPDATE_SCORE, this.onUpdateScore);
        bus.on(SERVER_EVENTS.END_GAME, this.onEndGame);


        ws.send(CLIENT_EVENTS.READY, null);
    }

    endGame() {
        bus.off(SERVER_EVENTS.START_GAME, this.onGameStarted);
        bus.off(SERVER_EVENTS.CUBIC_TAKEN, this.onCubicTaken);
        bus.off(SERVER_EVENTS.CUBIC_SET, this.onCubicSet);
        bus.off(SERVER_EVENTS.UPDATE_SCORE, this.onUpdateScore);
        bus.off(SERVER_EVENTS.END_GAME, this.onEndGame);
    }

    onGameStarted() {

    }

    onCubicTaken() {

    }

    onCubicSet() {

    }

    onUpdateScore() {

    }

    onEndGame() {

    }
}

export {OnlineGameController}