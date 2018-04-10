import {ViewInterface} from '../ViewInterface.js';

class AboutView extends ViewInterface {

    constructor() {
        super('jsMvc/Views/AboutView/aboutView.tmpl');
    }

    render(params = {}) {
        super.render(params);
        return this;
    }
}

export {AboutView};