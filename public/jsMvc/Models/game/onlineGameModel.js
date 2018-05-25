/**
 * @module models/game/onlineGameModel
 */

import {ws} from '../../Modules/ws.js';
import {CLIENT_EVENTS} from '../../Modules/game/serverEvents.js';

/**
 * Class implements online game strategy (multiPlayer) model
 */
class OnlineGameModel {

    /**
     * Subscribe on server events.
     * @param {string} eventName - The name of the event subscribe to.
     * @param {function(payload object)} func - The callback function.
     */
    subscribe(eventName, func) {
        ws.on(eventName, func);
    }

    /**
     * Unsubscribe on server events.
     * @param {string} eventName - The name of the event unsubscribe to.
     * @param {function(payload object)} func - The callback function.
     */
    unsubscribe(eventName, func) {
        ws.off(eventName, func);
    }

    /**
     * Open ws connection and send to the server info about placing the cube.
     * Cube is not fixed yet. It waits for response.
     * @param {{color: string, x: number, y: number}} payload - Info about where and which cube was set.
     */
    setCubic(payload) {
        ws.send(CLIENT_EVENTS.SET_CUBIC, payload);
    }

    /**
     * Send to the server info that the player is ready to play.
     */
    ready() {
        ws.connect(() => ws.send(CLIENT_EVENTS.READY));
    }

    /**
     * Send to the server info that the player closed the game screen and close ws connection.
     */
    close() {
        ws.send(CLIENT_EVENTS.CLOSE);
        ws.disconnect();
    }
}

export {OnlineGameModel};
