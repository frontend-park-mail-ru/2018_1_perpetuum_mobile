/**
 * @module views/menuView
 */

import {ViewInterface} from '../ViewInterface.js';
import {sharedData} from '../../Modules/sharedData.js';


/**
 * Class implements displaying menu.
 * @extends ViewInterface
 */
class MenuView extends ViewInterface {

    /**
     * Create a menu view instance.
     */
    constructor() {
        super('jsMvc/Views/MenuView/menuView.tmpl');
    }

    /**
     * Render the view.
     * @param {object} params - The object with info provided to fest.
     * @return {MenuView} The current object instance.
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

export {MenuView};