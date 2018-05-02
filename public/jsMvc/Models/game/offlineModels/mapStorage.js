/**
 * @module models/game/offlineModels/mapStorage
 */


/**
 * Class implements map storage.
 */
class MapStorage {

    /**
     * Initialize local storage and
     */
    constructor() {
        this.localStorage = window.localStorage;

        this.mapKey = 'maps';
        this.maps = null;
        this.restoreMaps();
    }

    restoreMaps() {
        /**
         * Initialize map if not exists
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

    addMap(mapNum, map) {
        this.maps[mapNum] = map;
        this.save();
        return this;
    }

    getMap(mapNum) {
        return this.maps[mapNum];
    }

    mapCount() {
        return this.mapKeys().length;
    }

    mapKeys() {
        return Object.keys(this.maps);
    }

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