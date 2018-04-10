import {ws} from '../../Modules/ws.js';
import {GameModel} from './gameModel.js';
import {HttpModule, baseUrl} from '../../Modules/HttpModule.js';

class OnlineGameModel extends GameModel{

    constructor() {
        super();
    }

    getMap(mapNum) {
        return HttpModule.doPostFetch({url: `${baseUrl}/multiplayer`, data: mapNum}).then((data) => {
            this.map = data;
            this.countVacantCubs();
            return data;
        });
    }

    setCubic(cubic) {
        const cubicInMap = Object.keys(this.map).map((key) => { return this.map[key];}).filter((obj) => {
            return (obj.colour === cubic.colour && obj.x === cubic.x && obj.y === cubic.y);
        });
        if (cubicInMap === []) {
            return false;
        }
        this.fixCubic(cubic);
        return true;
    }

    fixCubic(cubic) {
        ++this.currentProgress;
        ws.send("fixCubic", cubic);
    }
}

export {OnlineGameModel};