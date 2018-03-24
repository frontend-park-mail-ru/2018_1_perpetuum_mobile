class Bus {
    constructor() {
        this.listeners = {};
    }

    on(event, listener) {
        (this.listeners[event] || (this.listeners[event] = [])).push(listener);
        return this;
    }

    off(event, listener) {
        if (listener) {
            this.listeners[event] = (this.listeners[event] || []).filter(l => l !== listener);
        } else {
            this.listeners[event] = [];
        }
        return this;
    }

    emit(event, data) {
        (this.listeners[event] || (this.listeners[event] = [])).forEach(l => l(data));
        return this;
    }
}

const bus_singleton = new Bus();

export {bus_singleton as bus};
