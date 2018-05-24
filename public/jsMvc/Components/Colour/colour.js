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
            baseColorPurple:    ['#e040fb', '#9121b9', '#3d283d', '#b534cb'],
            baseColorYellow:    ['#ffc107', '#b97400', '#413d0d', '#e48f00'],
            baseColorGreen:     ['#8ed649', '#54762d', '#244627', '#6fa839'],
            baseColorOrange:    ['#fa6306', '#c2421a', '#391409', '#d85605'],
            baseColorBlue:      ['#6472ff', '#354596', '#151a38', '#3849c2'],
            baseColorLightBlue: ['#87fcff', '#25717a', '#11393e', '#66bfc1'],
        };
        this.colorSetKeys = ['--baseColor', '--logoColor', '--firstGradientColor', '--logoHoverColor'];

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