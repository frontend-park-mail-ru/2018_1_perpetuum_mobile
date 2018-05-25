/**
 *  @module components/BackgroundAnimation
 */
import {bus} from '../../Modules/bus.js';
import {fill} from '../../Modules/filling.js';
import {keyHandler} from '../../Modules/game/keyHandler.js';
import throttle from '../../Modules/throttle.js';

class BackgroundAnimation {
    /**
     * create line animation random color
     * @param position - position to create line
     */
    createELement(position) {
        const line = document.createElement('div');
        line.classList.add('background-animation');
        const parentEl = document.getElementsByClassName('js-application')[0];
        line.style.left = `${position}px`;
        line.style.width = `${fill.random(5, 15)}vmin`;
        line.style.animation = `line ${fill.random(2, 6)}s`;
        line.style.backgroundColor = fill.getRandomColor();
        parentEl.insertAdjacentElement('afterbegin', line);
        line.addEventListener('animationend', () => line.remove(), {once: true});
    }

    /**
     * constructor. Create current class instance
     */
    constructor() {
        this.keyHandler = keyHandler;
        bus.on('createLines', () => this.addLines());
        bus.on('removeLines', () => this.removeLines());
        this.create = throttle(evt => this.createELement(evt.X), 100);
    }

    /**
     * to bus emit createLines
     */
    addLines() {
        this.keyHandler.start();
        this.keyHandler.addKeyListener('startDrag', this.create);
        this.time = setInterval(() => {
            const parentEl = document.getElementsByClassName('js-application')[0];
            const position = fill.random(0, parentEl.offsetWidth);
            this.createELement(position);
        }, fill.random(2000, 5000));
    }

    /**
     * to bus emit removeLines
     */
    removeLines() {
        this.keyHandler.end();
        clearInterval(this.time);
    }

}

const backgroundAnimationSingleton = new BackgroundAnimation();
export {backgroundAnimationSingleton as backgroundAnimation};
