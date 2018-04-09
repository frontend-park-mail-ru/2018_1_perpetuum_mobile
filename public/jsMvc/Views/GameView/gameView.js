import {ViewInterface} from '../ViewInterface.js';
import {sharedData} from '../../Modules/sharedData.js'

class GameView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/LevelView/gameView.tmpl');
    }

}

export {GameView};
