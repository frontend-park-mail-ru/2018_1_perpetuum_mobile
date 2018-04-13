/** @module modules/sharedData */

/**
 * Class implements a storage for data need to be shared
 */
class SharedData {

    /**
     * Create a storage.
     */
    constructor() {
        this.data = {}
    }

    /**
     * Add the shared data to storage.
     * @param {string} property - The key of shared data in the storage.
     * @param {*} value - The value in storage that will be available via key.
     * @return {SharedData} The current object instance.
     */
    add(property, value) {
        this.data[property] = value;
        return this;
    }

    /**
     * Delete the shared data from storage.
     * @param {string} property - The key of shared data in the storage.
     * @return {SharedData} The current object instance.
     */
    del(property) {
        this.data[property] = null;
        return this;
    }
}

const sharedData = new SharedData();

export {sharedData};