/**
 * Universal key handler.
 * @module modules/game/keyHandler
 */

/**
 * System event formatting function for touchable devices.
 * @param evt - The event emitted on element by browser.
 * @return {{evt: *, X: number, Y: number}}
 */
function getXYTouch(evt) {
    return {
        evt,
        X: evt.targetTouches[0].pageX,
        Y: evt.targetTouches[0].pageY
    };
}

/**
 * System event formatting function for mouse-using devices.
 * @param evt - The event emitted on element by browser.
 * @return {{evt: *, X: number, Y: number}}
 */
function getXYMouse(evt) {
    return {
        evt,
        X: evt.pageX,
        Y: evt.pageY
    };
}

/**
 * For no object to return.
 */
const getObj = () => {{}};

/**
 * Config for events, how to propagate them and formatting.
 * @type {*[]}
 */
const handlers = [
    {
        eventName: 'touchstart',
        handler: getXYTouch,
        key: 'startDrag'
    },
    {
        eventName: 'mousedown',
        handler: getXYMouse,
        key: 'startDrag'
    },
    {
        eventName: 'touchmove',
        handler: getXYTouch,
        key: 'drag'
    },
    {
        eventName: 'mousemove',
        handler: getXYMouse,
        key: 'drag'
    },
    {
        eventName: 'mouseup',
        handler: getObj,
        key: 'endDrag'
    },
    {
        eventName: 'touchend',
        handler: getObj,
        key: 'endDrag'
    }
];

/** Class representing a key handler. */
class KeyHandler {

    /** Create a keyHandler. */
    constructor() {
        this.listeners = {};
        this.handlers = {};
    }

    //Bus functionality

    /** Subscribe on the event
     * @param {string} event - The event subscribe to.
     * @param {function} listener - The function will be invoked when event completed.
     * @return {KeyHandler} The same Bus instance (itself). */
    addKeyListener(event, listener) {
        (this.listeners[event] || (this.listeners[event] = [])).push(listener);
        return this;
    }

    /** Unsubscribe from the event.
     * @param {string} event - The event unsubscribe from.
     * @param {function} listener - The function to unsubscribe from event.
     * @return {KeyHandler} The same Bus instance (itself). */
    removeKeyListener(event, listener) {
        this.listeners[event] = (listener) ? (this.listeners[event] || []).filter(l => l !== listener) : [];
        return this;
    }

    /** Complete the event.
     * @param {string} event - The completed event.
     * @param data - All the arguments.
     * @return {KeyHandler} The same Bus instance (itself). */
    emitKey(event, ...data) {
        (this.listeners[event] || (this.listeners[event] = [])).forEach(l => l(...data));
        return this;
    }

    // Key handlers functionality

    /**
     * Initialize event handlers from config handlers.
     */
    start() {
        this.listeners = {};
        handlers.forEach(sub => {
            const emitter = evt => {
                this.emitKey(sub.key, sub.handler(evt));
            };
            document.addEventListener(sub.eventName, emitter);
            (this.handlers[sub.eventName] || (this.handlers[sub.eventName] = [])).push(emitter);
        });
    }

    /**
     * Remove all event handlers.
     */
    end() {
        Object.keys(this.handlers).forEach(eventName => {
            this.handlers[eventName].forEach((emitter) => document.removeEventListener(eventName, emitter));
        });
        this.handlers = {};
        this.listeners = {};
    }
}

/** @const keyHandler_singleton - The KeyHandler instance. Singleton. */
const keyHandler_singleton = new KeyHandler();


export {keyHandler_singleton as keyHandler};