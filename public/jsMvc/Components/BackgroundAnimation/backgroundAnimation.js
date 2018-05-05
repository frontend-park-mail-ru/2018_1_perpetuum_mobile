/**
 *  @module components/BackgroundAnimation
 */
import {bus} from '../../Modules/bus.js';

class BackgroundAnimation {
    /**
     * return random number
     * @param max {number} - random limit
     * @returns {number} - random number
     */
    random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * to bus emit createLines
     */
    addLines() {
        document.addEventListener('click', this.create);
        window.requestAnimationFrame(() => this.createElementOnTimer());
    }

    /**
     * to bus emit removeLines
     */
    removeLines() {
        document.removeEventListener('click', this.create);
        console.log(window.cancelAnimationFrame(this.animation));
    }

    /**
     * create line animation random color
     * @param position - position to create line
     */
    createELement(position) {
        const line = document.createElement('div');
        line.classList.add('background-animation');
        const parentEl = document.getElementsByClassName('js-application')[0];
        line.style.left = `${position}px`;
        line.style.width = `${this.random(5, 15)}vmin`;
        line.style.animation = `line ${this.random(2, 6)}s`;
        line.style.backgroundColor = this.colors[this.random(0, this.colors.length)];
        parentEl.insertAdjacentElement('afterbegin', line);
        line.addEventListener('animationend', () => line.remove());
    }

    /**
     * constructor. Create current class instance
     */
    constructor() {
        this.colors = ['HotPink', 'LimeGreen', 'Orange', 'Green', 'Magenta', 'Turquoise', 'White', 'DarkBlue', 'Seashell', 'DimGray', 'Yellow', 'Lime', 'Coral', 'Chocolate', 'RosyBrown'];
        bus.on('createLines', () => this.addLines());
        bus.on('removeLines', () => this.removeLines());
        this.create = evt => this.createELement((evt.pageX)? evt.pageX : evt.targetTouches[0].pageX);
    }

    /**
     * callback for request animation frame. To create line after random time
     */
    createElementOnTimer() {
        setTimeout(() => {
            const parentEl = document.getElementsByClassName('js-application')[0];
            const position = this.random(0, parentEl.offsetWidth);
            this.createELement(position);
            this.animation = window.requestAnimationFrame(() => this.createElementOnTimer());
        }, this.random(0, 5000));
    }
}

const backgroundAnimationSingleton = new BackgroundAnimation();
export {backgroundAnimationSingleton as backgroundAnimation};
