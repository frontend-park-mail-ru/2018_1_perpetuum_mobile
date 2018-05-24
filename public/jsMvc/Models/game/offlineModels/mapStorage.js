/**
 * @module models/game/offlineModels/mapStorage
 */


/**
 * Class implements map storage.
 */
class MapStorage {

    /**
     * Initialize local storage.
     */
    constructor() {
        this.localStorage = window.localStorage;

        this.mapKey = 'maps';
        this.maps = null;
        this.restoreMaps();
    }

    /**
     * Restore maps from local storage.
     * @return {MapStorage} The current object instance.
     */
    restoreMaps() {
        /**
         * Initialize map if not exists.
         */
        if (this.localStorage.getItem(this.mapKey) == null) {
            try {
                this.localStorage.setItem(this.mapKey, JSON.stringify(new Map()));
            } catch (e) {
                console.warn("Need more space for saving maps", e)
            }
        }

        this.maps = JSON.parse(this.localStorage.getItem(this.mapKey));

        return this;
    }

    /**
     * Add map in operative memory.
     * If you need to save {@see save}.
     * @param {number} mapNum - The map number (key).
     * @param {Object} map - The map (value).
     * @return {MapStorage} The current object instance.
     */
    addMap(mapNum, map) {
        this.maps[mapNum] = map;
        this.save();
        return this;
    }

    /**
     * Get the map from storage.
     * @param {number} mapNum - The map number (key).
     * @return {Object | undefined} The map.
     */
    getMap(mapNum) {
        return this.maps[mapNum];
    }

    /**
     * Get the already cached maps count.
     * @return {number} The count of already cached maps.
     */
    mapCount() {
        return this.mapKeys().length;
    }

    /**
     * Get the map keys.
     * @return {string[]} The map keys.
     */
    mapKeys() {
        return Object.keys(this.maps);
    }

    /**
     * Save new maps from operative memory to local storage.
     * @return {MapStorage} The current object instance.
     */
    save() {
        try {
            this.localStorage.setItem(this.mapKey, JSON.stringify(this.maps));
        } catch (e) {
            console.warn("Need more space for saving maps", e)
        }
        return this;
    }
}

const mapStorageSingleton = new MapStorage();

export {mapStorageSingleton as mapStorage}