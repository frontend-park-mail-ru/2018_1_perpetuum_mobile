/**
 * @module components/colour
 */


import {fill} from '../../Modules/filling.js';

/**
 * Class for changing the color scheme.
 */
class Colour {

    /**
     * Create color scheme controller instance.
     * @param {string} rootClassName - The class name selector for the root
     * element where color scheme properties are defined.
     */
    constructor(rootClassName) {
        this.colorSet = {
            baseColorPurple: ['#e040fb', '#9c23c7', '#2e1e2e'],
            baseColorYellow: ['#ffc107', '#ffa000', '#2e2e02'],
            baseColorGreen:  ['#689f38', '#8bc34a', '#1e2e22'],
            baseColorOrange: ['#e64a19', '#ff5722', '#391409'],
            baseColorBlue:   ['#303f9f', '#3f51b5', '#10142b'],
        };
        this.colorSetKeys = ['--baseColor', '--logoColor', '--firstGradientColor'];

        this.paintForm = document.getElementsByClassName('wrapper-block__change-color')[0];
        this.paintForm.addEventListener('mousedown', this.setRandomScheme.bind(this));

        this.elemDom = document.getElementsByClassName(rootClassName)[0];
        this.prevKeyScheme = 0;
    }

    /**
     * Set random colour scheme.
     * Uses {@link setScheme}
     */
    setRandomScheme() {
        let rand = fill.random(0, Object.keys(this.colorSet).length);
        while (rand === this.prevKeyScheme) {
            rand = fill.random(0, Object.keys(this.colorSet).length);
        }
        this.prevKeyScheme = rand;
        let keyRand = Object.keys(this.colorSet)[rand];
        this.setScheme(this.colorSet[keyRand]);
    }

    /**
     * Set colour scheme.
     * @param {Array<string>} colorSet - The array contains values for colorSetKeys.
     */
    setScheme(colorSet) {
        colorSet.forEach( (item, i) => {
            this.elemDom.style.setProperty(this.colorSetKeys[i], item);
        });
        const meta = document.getElementById('colour');
        meta.content = colorSet[0];
    }
}

export {Colour};