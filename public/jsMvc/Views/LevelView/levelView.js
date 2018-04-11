/**
 * @module views/levelView
 */

import {ViewInterface} from '../ViewInterface.js';
import {sharedData} from '../../Modules/sharedData.js';


/**
 * Class implements the view of selecting level page.
 * @extends ViewInterface
 */
class LevelView extends ViewInterface {

    /**
     * Create level selection class instance.
     */
    constructor() {
        super('jsMvc/Views/LevelView/levelView.tmpl');
    }

    /**
     * Render the view.
     * @param {object} params - The object with info provided to fest.
     * @return {LevelView} The current object instance.
     */
    render(params = {}) {
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

    }
}

export {LevelView};
