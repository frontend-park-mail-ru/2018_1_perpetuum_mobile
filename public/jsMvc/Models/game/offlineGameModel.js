import {GameModel} from './gameModel.js';
import {HttpModule, baseUrl} from '../../Modules/HttpModule.js';

class OfflineGameModel extends GameModel{

    constructor() {
        super();
        this.setRight = null;
    }

    getMap(mapNum) {
        // TEST WITHOUT SERVER
        return Promise.resolve(
            {
                countX: 5,
                countY: 5,
                cells: [{
                    x: 0,
                    y: 0,
                    fixed: false,
                    colour: "#691f23"
                },
                    {
                        x: 0,
                        y: 2,
                        fixed: true,
                        colour: "#875a03"
                    },
                    {
                        x: 0,
                        y: 1,
                        fixed: true,
                        colour: "#993d0c"
                    },
                    {
                        x: 1,
                        y: 0,
                        fixed: true,
                        colour: "#245b99"
                    },
                    {
                        x: 4,
                        y: 4,
                        fixed: true,
                        colour: "#245b99"
                    },
                    {
                        x: 4,
                        y: 3,
                        fixed: true,
                        colour: "#245b99"
                    },
                    {
                        x: 2,
                        y: 2,
                        fixed: true,
                        colour: "#245b99"
                    }
                ]
            }
            /*{
                countX: 2,
                countY: 3,
                cells: [{
                    x: 0,
                    y: 0,
                    fixed: false,
                    colour: "#691f23"
                },
                {
                    x: 0,
                    y: 2,
                    fixed: true,
                    colour: "#875a03"
                },
                {
                    x: 0,
                    y: 1,
                    fixed: false,
                    colour: "#993d0c"
                },
                {
                    x: 1,
                    y: 0,
                    fixed: false,
                    colour: "#992837"
                }]
            }*/
        ).then((data) => {
                this.map = data;
                this.countVacantCubs();
                return data;
            }
        );

        /*return HttpModule.doPostFetch({url: `${baseUrl}/level`, data: mapNum}).then((data) => {
            this.map = data;
            this.countVacantCubs();
            return data;
        });*/
    }

    countVacantCubs() {
        this.vacantCubs = Object.keys(this.map).filter((key) => {
            return (key === 'cell' && this.map[key].fixed === false)
        }).length;
    }

    setCubic(cubic) {
        const cubicInMap = Object.keys(this.map).map((key) => { return this.map[key];}).filter((obj) => {
            return (obj.colour === cubic.colour && obj.x === cubic.x && obj.y === cubic.y);
        });
        if (cubicInMap === []) {
            if (this.setRight[cubic.colour]) {
                this.setRight[cubic.colour] = false;
                --this.currentProgress;
            }
            return false;
        }
        this.setRight[cubic.colour] = true;
        ++this.currentProgress;
        return true;
    }
}

export {OfflineGameModel};