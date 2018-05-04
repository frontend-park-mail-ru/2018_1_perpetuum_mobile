/**
 * @module views/aboutView
 */


import {ViewInterface} from '../ViewInterface.js';
import {Colour} from '../../Components/Colour/colour.js';
import template from './aboutView.tmpl.xml';

/**
 * About view
 * @extends ViewInterface
 */
class AboutView extends ViewInterface {
    /**
     * Create a AboutView instance.
     */
    constructor() {
        super(template);
    }

    /**
     * Render the view.
     * @param {object} params - The object with info provided to fest.
     * @return {AboutView} The current object instance.
     */
    render(params = {}) {
        super.render(params);
        this.init();
        return this;
    }

    /**
     * Create colour to switch colour scheme
     */
    init() {
        this.colour = new Colour('colors');
    }
}

export {AboutView};