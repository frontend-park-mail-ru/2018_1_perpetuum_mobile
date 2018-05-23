/**
 * @module models/game/offlineGameModel
 */


import {HttpModule, baseUrl} from '../../Modules/HttpModule.js';
import {sharedData} from '../../Modules/sharedData.js';
import {mapStorage} from './offlineModels/mapStorage.js';


/**
 * Class implements offline game strategy model.
 */
class OfflineGameModel {

    /**
     * Creates offline model instance.
     */
    constructor() {
        this.map = null;
        this.currentProgress = 0;
        this.vacantCubes = 0;
        this.setRight = [];
        this.gameProgress = [];
        this.mapNum = null; // current map number
        this.results = null;
        this.mapStorage = mapStorage;
    }

    /**
     * Getter for level count that is available now.
     * Online - all levels on server, offline - cached levels.
     * @return {Promise<number>} Level count.
     */
    get levelCount() {
        if (navigator.onLine) {
            return HttpModule.doGetFetch({url: `${baseUrl}/levelCount`}).then(data => {
                return data.count;
            });
        } else {
            return Promise.resolve(this.mapStorage.mapCount());
        }
    }

    /**
     * Delete saved game progress results.
     */
    deleteProgress() {
        this.results = null;
    }

    /**
     * Get the user levels progress.
     * @return {Promise<*[{levelNum: number, time: number, saved: boolean}]|null>}
     */
    getProgress() {
        if (navigator.onLine && sharedData.data['currentUser']) {
            return HttpModule.doGetFetch({url: `${baseUrl}/results`}).then(data => {
                this.results = data;
                this.results.map(lvl => {
                    lvl.saved = true;
                    return lvl;
                });
                return this.results;
            }).catch(() => {
                return null;
            });
        }
        this.gameProgress.forEach(progress => {
            this.results = this.results || [];
            if (!this.results.some(res => {
                if (progress.levelNum === res.levelNum) {
                    if (progress.time < res.time) {
                        res.time = progress.time;
                        res.saved = false;
                    }
                    return true;
                }
                return false;
            })) {
                progress.saved = false;
                this.results.push(progress);
            }
        });
        return Promise.resolve(this.results);
    }

    /**
     * Get the map from server.
     * It will be cached by local storage.
     * @param {object<page number>} mapNum - The level number to download.
     * @return {Promise<{countX: number, countY: number, cells: *[]}>} The map.
     */
    getMap(mapNum) {
        const data = this.mapStorage.getMap(mapNum.page);
        let promiseMap = null;
        if (data !== undefined) {
            promiseMap = Promise.resolve(data)
        } else {
            promiseMap = HttpModule.doGetFetch({url: `${baseUrl}/level/` + mapNum.page}).then(data => {
                this.mapStorage.addMap(mapNum.page, data);
                return data;
            })
        }
        return promiseMap.then(data => {
            this.map = data;
            this.mapNum = mapNum.page;
            this.countVacantCubes();
            data.cells.map(el => el.colour).forEach(el => this.setRight[el] = false);
            return data;
        });
    }

    /**
     * Count the cubs which are not fixed.
     * Write the count to vacantCubes.
     */
    countVacantCubes() {
        this.vacantCubes = this.map.cells.filter(el => !el.fixed).length;
    }

    /**
     * Control setting the cubic.
     * @param {Object} cubic - The cubic instance.
     * @return {boolean} The value signalize whether cubic was set in right place or not.
     */
    setCubic(cubic) {

        const cubicInMap = this.map.cells.filter(obj => {
            return (obj.colour === cubic.colour && obj.x === cubic.x && obj.y === cubic.y);
        });

        if (!cubicInMap.length) {
            if (this.setRight[cubic.colour]) {
                this.setRight[cubic.colour] = false;
                --this.currentProgress;

            }
            return false;
        }
        if (!this.setRight[cubic.colour]) {
            ++this.currentProgress;
            this.setRight[cubic.colour] = true;
        }
        return true;
    }

    /**
     * Save game progress locally.
     * Save the best user result.
     * @param progress - The new user good result.
     */
    addGameProgress(progress) {
        progress.levelNum = this.mapNum;
        let replaced = this.gameProgress.some((saved, i) => {
            if (progress.levelNum === saved.levelNum) {
                if (progress.time < saved.time) {
                    this.gameProgress[i] = progress;
                }
                return true;
            }
            return false;
        });
        if (!replaced) {
            this.gameProgress.push(progress);
        }
    }

    /**
     * Send user progress to server.
     * @return {boolean} Indicator whether all the data have been sent to server.
     */
    sendGameProgress() {
        if (!this.gameProgress.length) {
            console.warn('No user progress to send');
            return true;
        }
        if (navigator.onLine && sharedData.data['currentUser']) {
            this.gameProgress.forEach(elem => {
                HttpModule.doPostFetch({url: `${baseUrl}/save`, data: elem});
            });
            this.gameProgress = [];
            return true;
        }
        return false;
    }
}

export {OfflineGameModel};