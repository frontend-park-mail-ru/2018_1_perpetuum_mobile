/**
 * @module views/scoreboardView
 */

import {ViewInterface} from '../ViewInterface.js';
import {sharedData} from '../../Modules/sharedData.js';


/**
 * Class implements displaying scoreboard.
 * @extends ViewInterface
 */
class ScoreboardView extends ViewInterface {

    /**
     * Create a view.
     * Associate with fest template.
     */
    constructor() {
        super('jsMvc/Views/ScoreboardView/scoreboardView.tmpl');
    }

    /**
     * Render the view.
     * @param {object} params - The object with page info and user info.
     * @return {ScoreboardView} The current object instance.
     */
    render(params = {}) {
        if (Object.keys(params).length === 0 && params.constructor === Object) {
            this.onOpenPage();
            return this;
        }
        if (!params['paginator']) {
            this.onOpenPage({page: +params.urlParams[0]});
            return this;
        }
        params.sharedData = sharedData.data;
        super.render(params);
        this.init();
        return this;
    }

    /**
     * Initialize event handlers for the page: pagination and logout.
     */
    init() {
        if (sharedData.data['currentUser']) {
            const toLogoutForm = this.el.getElementsByClassName('js-logout-form')[0];
            toLogoutForm.addEventListener('submit', this.onLogout);
        }

        const leftPaginatorButton = this.el.getElementsByClassName('js-scoreboardPaginatorButtonLeft')[0];
        leftPaginatorButton.addEventListener('click', this.onPaginatorLeft);

        const rightPaginatorButton = this.el.getElementsByClassName('js-scoreboardPaginatorButtonRight')[0];
        rightPaginatorButton.addEventListener('click', this.onPaginatorRight);
    }
}

export {ScoreboardView};