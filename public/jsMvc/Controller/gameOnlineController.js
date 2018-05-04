/**
 * @module controller/gameOnlineController
 */


import {SERVER_EVENTS} from '../Modules/game/serverEvents.js';
import {OnlineGameModel} from '../Models/game/onlineGameModel.js';
import {OnlineGameView} from '../Views/OnlineGameView/onlineGameView.js';
import template from './../Views/OnlineGameView/onlineGameView.tmpl.xml';

/**
 * Class implements online game strategy (multiPlayer) controller.
 */
class OnlineGameController {

    /**
     * Initialize online game controller.
     */
    constructor() {
        this.gameView = new OnlineGameView(template);
        this.gameModel = new OnlineGameModel();

        this.gameView.onReady = this.onReady.bind(this);
        this.gameView.onSetCubic = this.onSetCubic.bind(this);
        this.gameView.onClose = this.onClose.bind(this);

        this.onStartGame = this.onStartGame.bind(this);
        this.onCubicSet = this.onCubicSet.bind(this);
        this.onCubicDrop = this.onCubicDrop.bind(this);
        this.onEndGame = this.onEndGame.bind(this);
    }

    /**
     * Initialize handlers for server events.
     */
    initGame() {
        this.gameModel.subscribe(SERVER_EVENTS.START_GAME, this.onStartGame);
        this.gameModel.subscribe(SERVER_EVENTS.CUBIC_SET, this.onCubicSet);
        this.gameModel.subscribe(SERVER_EVENTS.CUBIC_DROP, this.onCubicDrop);
        this.gameModel.subscribe(SERVER_EVENTS.END_GAME, this.onEndGame);
    }

    /**
     * Drop handlers from server events.
     */
    closeGame() {
        this.gameModel.unsubscribe(SERVER_EVENTS.START_GAME, this.onStartGame);
        this.gameModel.unsubscribe(SERVER_EVENTS.CUBIC_SET, this.onCubicSet);
        this.gameModel.unsubscribe(SERVER_EVENTS.CUBIC_DROP, this.onCubicDrop);
        this.gameModel.unsubscribe(SERVER_EVENTS.END_GAME, this.onEndGame);
    }

    /**
     * Initialize map, players, render view.
     *
     * @param payload Contains map and info about the opponent.
     */
    onStartGame(payload) {
        this.gameView.startGame(payload);
    }

    /**
     * Fix the cubic in place the player set it. Also renew the scores.
     * @param {{color: string, your: number, opponent: number}} payload The info about cubic to be set, new players scores.
     */
    onCubicSet(payload) {
        this.gameView.cubicSet(payload);
    }

    /**
     * Drop the cubic from the place the player set it to the pool.
     * @param {{color: string}} payload The info about cubic to be dropped to the pool.
     */
    onCubicDrop(payload) {
        this.gameView.cubicDrop(payload);
    }

    /**
     * End the game in view.
     * @param {{your: string, opponent: string, result: string}} payload The info about the scores and game winner.
     */
    onEndGame(payload) {
        this.gameView.endGame(payload);
        this.closeGame();
    }

    /**
     * Wire the signals from server and send to the server info that the player is searching for an opponent.
     */
    onReady() {
        this.initGame();
        this.gameModel.ready();
    }

    /**
     * Send to the server info about placing the cube.
     * Cube is not fixed yet. It waits for response.
     * @param {{color: string, x: number, y: number}} payload - Info about where and which cube was set.
     */
    onSetCubic(payload) {
        this.gameModel.setCubic(payload);
    }

    /**
     * Send to the server info that the game was closed and destruct the wires connects server events with handlers.
     */
    onClose() {
        this.gameModel.close();
        this.closeGame();
    }
}

export {OnlineGameController}