class SharedData {
    constructor() {
        this.data = {}
    }

    add(property, value) {
        this.data[property] = value;
        return this;
    }

    del(property) {
        this.data[property] = null;
        return this;
    }
}

const sharedData = new SharedData();

export {sharedData};