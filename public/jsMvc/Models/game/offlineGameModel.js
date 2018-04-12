import {GameModel} from './gameModel.js';
import {HttpModule, baseUrl} from '../../Modules/HttpModule.js';

class OfflineGameModel extends GameModel{

    constructor() {
        super();
        this.setRight = [];
    }

    getMap(mapNum) {
        // TEST WITHOUT SERVER
        return Promise.resolve(
            {
                countX: 3,
                countY: 3,
                    cells: [{
                        x: 2,
                        y: 2,
                        fixed: false,
                        colour: "#256b73"
                    },
                    {
                        x: 2,
                        y: 0,
                        fixed: false,
                        colour: "#78f0c3"
                    },
                    {
                        x: 0,
                        y: 2,
                        fixed: false,
                        colour: "#4c394d"
                    },
                    {
                        x: 2,
                        y: 1,
                        fixed: true,
                        colour: "#4faa99"
                    },
                    {
                        x: 0,
                        y: 0,
                        fixed: true,
                        colour: "#a15088"
                    },
                    {
                        x: 1,
                        y: 0,
                        fixed: true,
                        colour: "#9ba5a6"
                    },
                    {
                        x: 1,
                        y: 2,
                        fixed: true,
                        colour: "#425262"
                    },
                    {
                        x: 0,
                        y: 1,
                        fixed: true,
                        colour: "#75476c"
                    }
                ]
            }
            // {
            //     countX: 3,
            //     countY: 2,
            //     cells: [{
            //         x: 0,
            //         y: 0,
            //         fixed: true,
            //         colour: "#691f23"
            //     },
            //     {
            //         x: 2,
            //         y: 0,
            //         fixed: true,
            //         colour: "#875a03"
            //     },
            //     {
            //         x: 1,
            //         y: 0,
            //         fixed: true,
            //         colour: "#993d0c"
            //     },
            //     {
            //         x: 2,
            //         y: 1,
            //         fixed: false,
            //         colour: "#992837"
            //     }]
            //}
        ).then(data => {
            this.map = data;
            this.countVacantCubs();
            data.cells.map(el => el.colour).forEach(el => this.setRight[el] = false);
            return data;
        }
        );

        /*return HttpModule.doGetFetch({url: `${baseUrl}/level/` + mapNum.page}).then((data) => {
            this.map = data;
            this.countVacantCubs();
            return data;
        });*/
    }

    countVacantCubs() {
        this.vacantCubs = this.map.cells.filter(el => el.fixed).length;
    }

    setCubic(cubic) {

        const cubicInMap = this.map.cells.filter((obj) => {
            return (obj.colour === cubic.colour && obj.x === cubic.x && obj.y === cubic.y);
        });

        if (cubicInMap.length === 0) {

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
}

export {OfflineGameModel};