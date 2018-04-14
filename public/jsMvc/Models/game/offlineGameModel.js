/**
 * @module models/game/offlineGameModel
 */


import {HttpModule, baseUrl} from '../../Modules/HttpModule.js';
import {sharedData} from '../../Modules/sharedData.js';


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
    }

    /**
     * Get the map from server.
     * It will be cached by service worker.
     * @param {object<page number>} mapNum - The level number to download.
     * @return {Promise<{countX: number, countY: number, cells: *[]}>} The map.
     */
    getMap(mapNum) {
        // TEST WITHOUT SERVER
        let testMap = null;
        switch (mapNum.page) {
            case 1:
                testMap = {
                    countX: 3,
                    countY: 3,
                    cells: [{
                        x: 2,
                        y: 2,
                        fixed: false,
                        colour: '#256b73'
                    },
                    {
                        x: 2,
                        y: 0,
                        fixed: false,
                        colour: '#78f0c3'
                    },
                    {
                        x: 0,
                        y: 2,
                        fixed: false,
                        colour: '#4c394d'
                    },
                    {
                        x: 2,
                        y: 1,
                        fixed: true,
                        colour: '#4faa99'
                    },
                    {
                        x: 0,
                        y: 0,
                        fixed: true,
                        colour: '#a15088'
                    },
                    {
                        x: 1,
                        y: 0,
                        fixed: true,
                        colour: '#9ba5a6'
                    },
                    {
                        x: 1,
                        y: 2,
                        fixed: true,
                        colour: '#425262'
                    },
                    {
                        x: 0,
                        y: 1,
                        fixed: true,
                        colour: '#75476c'
                    }]
                };
                break;
            default:
                testMap = {
                    countX: 4,
                    countY: 5,
                    cells: [{
                        x: 0,
                        y: 0,
                        fixed: false,
                        colour: '#414141'
                    },
                    {
                        x: 1,
                        y: 0,
                        fixed: true,
                        colour: '#6C554F'
                    },
                    {
                        x: 2,
                        y: 0,
                        fixed: true,
                        colour: '#AE6560'
                    },
                    {
                        x: 3,
                        y: 0,
                        fixed: true,
                        colour: '#FF827D'
                    },
                    {
                        x: 2,
                        y: 1,
                        fixed: true,
                        colour: '#B1755F'
                    },
                    {
                        x: 2,
                        y: 2,
                        fixed: true,
                        colour: '#BD8159'
                    },
                    {
                        x: 2,
                        y: 3,
                        fixed: true,
                        colour: '#C48A4B'
                    },
                    {
                        x: 2,
                        y: 4,
                        fixed: false,
                        colour: '#C69A43'
                    }]
                };
        }
        return Promise.resolve(
            testMap
        ).then(data => {
            this.map = data;
            this.mapNum = mapNum.page;
            this.countVacantCubes();
            data.cells.map(el => el.colour).forEach(el => this.setRight[el] = false);
            return data;
        }
        );
        /*return HttpModule.doGetFetch({url: `${baseUrl}/level/` + mapNum.page}).then((data) => {
            this.map = data;
            this.mapNum = mapNum.page;
            this.countVacantCubes();
            data.cells.map(el => el.colour).forEach(el => this.setRight[el] = false);
            return data;
        });*/
    }

    /**
     * Count the cubs which are not fixed.
     * Write the count to vacantCubes.
     */
    countVacantCubes() {
        this.vacantCubes = this.map.cells.filter(el => el.fixed).length;
    }

    /**
     * Control setting the cubic.
     * @param {Object} cubic - The cubic instance.
     * @return {boolean} The value signalize whether cubic was set in right place or not.
     */
    setCubic(cubic) {

        const cubicInMap = this.map.cells.filter((obj) => {
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