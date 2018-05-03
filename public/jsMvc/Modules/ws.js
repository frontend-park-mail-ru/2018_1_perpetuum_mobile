/**
 * @module modules/ws
 * UNUSED
 */


import {bus} from './bus.js';
import {SERVER_EVENTS} from './game/serverEvents.js';
import {baseUrl} from './HttpModule.js';


/**
 * Class implements communication over webSockets protocol.
 */
class Ws {

    /**
     * Create the class instance, connect to the server.
     */
    constructor() {
        const address = `${baseUrl.replace('http', 'ws')}/ws`;
        this.ws = new WebSocket(address);
        this.ws.onopen = (event) => {
            console.log(`WebSocket on address ${address} opened`);
            console.dir(this.ws);

            this.ws.onmessage = this.handleMessage.bind(this);

            this.ws.onclose = () => {
                console.log('WebSocket closed');
            };
        };
    }

    /**
     * Handle the message from server.
     * Checks whether message.type is in SERVER_EVENTS. If not then stops propagating the event.
     * @param {object} event - The event from server.
     */
    handleMessage(event) {
        const messageText = event.data;

        try {
            const message = JSON.parse(messageText);
            if (message.type in SERVER_EVENTS) {
                bus.emit(message.type, message.payload);
            }
        } catch (err) {
            console.error('smth went wront in handleMessage: ', err);
        }
    }

    /**
     * Send the message to server.
     * @param {*} type - The type of the message to send.
     * @param {*} payload - The payload of the message to send.
     */
    send(type, payload) {
        this.ws.send(JSON.stringify({type, payload}));
    }
}

const ws_singleton = new Ws();

export {ws_singleton as ws};
