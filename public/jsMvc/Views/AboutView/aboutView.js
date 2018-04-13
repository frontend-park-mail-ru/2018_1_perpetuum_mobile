import {ViewInterface} from '../ViewInterface.js';
import {Colour} from '../../Components/Colour/colour.js';

class AboutView extends ViewInterface {

    constructor() {
        super('jsMvc/Views/AboutView/aboutView.tmpl');
    }

    render(params = {}) {
        super.render(params);
        this.init();
        return this;
    }

    init() {
        this.colour = new Colour('colors');
    }
}

export {AboutView};