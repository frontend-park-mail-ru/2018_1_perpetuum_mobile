/**
 * @module modules/ws
 * UNUSED
 */


import {SERVER_EVENTS} from './game/serverEvents.js';
import {baseUrl} from './HttpModule.js';


/**
 * Class implements communication over webSockets protocol.
 */
class Ws {

    /**
     * Create the class instance.
     */
    constructor() {
        this.listeners = {};
        this.address = `${window.location.protocol.replace('http', 'ws')}${baseUrl}/ws`;
    }

    /**
     * Open ws connection to server.
     * @param {function} onOpenFunc - The callback for onOpen event.
     * @return {Ws} The same class instance.
     */
    connect(onOpenFunc) {
        this.ws = new WebSocket(this.address);
        this.ws.onopen = (event) => {
            console.log(`WebSocket on address ${this.address} opened`);
            console.dir(this.ws);

            this.ws.onmessage = this.handleMessage.bind(this);

            this.ws.onclose = () => {
                console.log('WebSocket closed');
            };
            onOpenFunc();
        };
        return this;
    }

    /**
     * Close ws connection to server.
     * @return {Ws} The same class instance.
     */
    disconnect() {
        this.ws.close();
        this.ws = null;
        return this;
    }

    /**
     * Handle the message from server.
     * Checks whether message.type is in SERVER_EVENTS. If not then stops propagating the event.
     * @param {object} event - The event from server.
     */
    handleMessage(event) {
        const messageText = event.data;

        try {
            console.log(messageText);
            const message = JSON.parse(messageText);
            if (message.type in SERVER_EVENTS) {
                this.emit(message.type, message);
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
    send(type, payload = {}) {
        payload.type = type;
        this.ws.send(JSON.stringify(payload));
    }

    /** Subscribe on the event
     * @param {string} event - The event subscribe to.
     * @param {function} listener - The function will be invoked when event completed.
     * @return {Ws} The same Ws instance (itself). */
    on(event, listener) {
        (this.listeners[event] || (this.listeners[event] = [])).push(listener);
        return this;
    }

    /** Unsubscribe from the event.
     * @param {string} event - The event unsubscribe from.
     * @param {function} listener - The function to unsubscribe from event.
     * @return {Ws} The same Ws instance (itself). */
    off(event, listener) {
        if (listener) {
            this.listeners[event] = (this.listeners[event] || []).filter(l => l !== listener);
        } else {
            this.listeners[event] = [];
        }
        return this;
    }

    /** Complete the event.
     * @param {string} event - The completed event.
     * @param {Array.<>} data  - The array of params.
     * @return {Ws} The same Ws instance (itself). */
    emit(event, ...data) {
        (this.listeners[event] || (this.listeners[event] = [])).forEach(l => l(...data));
        return this;
    }

}

const ws_singleton = new Ws();

export {ws_singleton as ws};
