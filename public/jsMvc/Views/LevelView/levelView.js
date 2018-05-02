/**
 * @module views/levelView
 */

import {ViewInterface} from '../ViewInterface.js';
import {sharedData} from '../../Modules/sharedData.js';
import {Colour} from '../../Components/Colour/colour.js';
import template from './levelView.tmpl.xml';


/**
 * Class implements the view of selecting level page.
 * @extends ViewInterface
 */
class LevelView extends ViewInterface {

    /**
     * Create level selection class instance.
     */
    constructor() {
        super(template);
    }

    /**
     * Render the view.
     * @param {object} params - The object with info provided to fest.
     * @return {LevelView} The current object instance.
     */
    render(params = {}) {
        if (Object.keys(params).length === 0 && params.constructor === Object) {
            this.getLevels();
            return this;
        }
        if (!params['paginator']) {
            this.getLevels({page: +params.urlParams[0]});
            return this;
        }
        params.sharedData = sharedData.data;
        super.render(params);
        this.init();
        return this;
    }

    /**
     * Initialize event handlers for the page: logout.
     */
    init() {
        if (sharedData.data['currentUser']) {
            const toLogoutForm = this.el.getElementsByClassName('js-logout-form')[0];
            toLogoutForm.addEventListener('submit', this.onLogout);
        }

        const leftPaginatorButton = this.el.getElementsByClassName('js-scoreboardPaginatorButtonLeft')[0];
        leftPaginatorButton.addEventListener('click', this.onLevelOverviewPaginatorLeft);

        const rightPaginatorButton = this.el.getElementsByClassName('js-scoreboardPaginatorButtonRight')[0];
        rightPaginatorButton.addEventListener('click', this.onLevelOverviewPaginatorRight);

        this.colour = new Colour('colors');
    }

}

export {LevelView};
