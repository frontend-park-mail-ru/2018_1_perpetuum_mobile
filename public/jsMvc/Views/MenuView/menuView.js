/**
 * @module views/menuView
 */

import {ViewInterface} from '../ViewInterface.js';
import {sharedData} from '../../Modules/sharedData.js';
import {Colour} from '../../Components/Colour/colour.js';
import template from './menuView.tmpl.xml';
import {bus} from '../../Modules/bus.js';


/**
 * Class implements displaying menu.
 * @extends ViewInterface
 */
class MenuView extends ViewInterface {

    /**
     * Create a menu view instance.
     */
    constructor() {
        super(template);
    }

    /**
     * Render the view.
     * @param {object} params - The object with info provided to fest.
     * @return {MenuView} The current object instance.
     */
    render(params = {}) {
        bus.emit('createLines');
        params.sharedData = sharedData.data;
        super.render(params);
        this.init();
        return this;
    }

    /**
     * Initialize event handlers for the page: logout.
     */
    init() {
        if (!sharedData.data['currentUser']) {
            const multiplayerAllowed = this.el.getElementsByClassName('js-multiplayer')[0];
            multiplayerAllowed.style.color = '#666666';
            multiplayerAllowed.style.borderColor = 'transparent';
            multiplayerAllowed.style.cursor = 'default';
        }
        if (sharedData.data['currentUser']) {
            const toLogoutForm = this.el.getElementsByClassName('js-logout-form')[0];
            toLogoutForm.addEventListener('submit', this.onLogout);
        }
        this.colour = new Colour('colors');
    }

    /**
     * Destroy the current view.
     * Delete all rendered html.
     * @return {MenuView} The current object instance.
     */
    destroy() {
        super.destroy();
        bus.emit('removeLines');
        return this;
    }

}

export {MenuView};