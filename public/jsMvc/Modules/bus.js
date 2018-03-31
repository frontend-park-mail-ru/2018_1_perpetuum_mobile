/** @module modules/bus */

/** Class representing a bus. */
class Bus {

    /** Create a bus. */
    constructor() {
        this.listeners = {};
    }

    /** Subscribe on the event
     * @param {string} event - The event subscribe to.
     * @param {function} listener - The function will be invoked when event completed.
     * @return {Bus} The same Bus instance (itself). */
    on(event, listener) {
        (this.listeners[event] || (this.listeners[event] = [])).push(listener);
        return this;
    }

    /** Unsubscribe from the event.
     * @param {string} event - The event unsubscribe from.
     * @param {function} listener - The function to unsubscribe from event.
     * @return {Bus} The same Bus instance (itself). */
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
     * @param {Array.<>} data  - The
     * @return {Bus} The same Bus instance (itself). */
    emit(event, data = []) {
        (this.listeners[event] || (this.listeners[event] = [])).forEach(l => l(...data));
        return this;
    }
}

/** @const bus_singleton - The Bus instance. Singleton. */
const bus_singleton = new Bus();


export {bus_singleton as bus};
