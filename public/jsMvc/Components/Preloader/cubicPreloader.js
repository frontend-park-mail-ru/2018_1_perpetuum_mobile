/**
 *  @module components/CubicPreloader
 */
class CubicPreloader {
    /**
     * constructor. Create current class instance
     */
    constructor() {
        const parent = document.getElementsByClassName('js-wrapper-block')[0];
        this.preloader = document.createElement('div');
        this.preloader.classList.add('preloader');
        for (let i = 0; i < 4; i++) {
            const item = document.createElement('div');
            item.classList.add(`preloader__item-${i+1}`);
            this.preloader.appendChild(item);
        }
        parent.appendChild(this.preloader);
    }

    /**
     * remove preloader from DOM
     */
    removePreloader() {
        this.preloader.remove();
    }
}

export {CubicPreloader};