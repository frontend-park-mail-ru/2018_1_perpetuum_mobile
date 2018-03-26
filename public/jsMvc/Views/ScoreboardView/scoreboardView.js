import {ViewInterface} from '../ViewInterface.js';

class ScoreboardView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/ScoreboardView/scoreboardView.tmpl');
    }
}

export {ScoreboardView};