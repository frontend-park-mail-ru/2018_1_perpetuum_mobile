/**
 *  @module components/BackgroundAnimation
 */
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
        line.addEventListener('animationend', () => {
            line.remove();
        });
    }

    /**
     * constructor. Create current class instance
     */
    constructor() {
        this.colors = ['HotPink', 'LimeGreen', 'Orange', 'Green', 'Magenta', 'Turquoise', 'White', 'DarkBlue', 'Seashell', 'DimGray', 'Yellow', 'Lime', 'Coral', 'Chocolate', 'RosyBrown'];

        document.onclick = evt => {
            const position = (evt.pageX)? evt.pageX : evt.targetTouches[0].pageX;
            this.createELement(position);
        };

        window.requestAnimationFrame(this.createElementOnTimer.bind(this));
    }

    /**
     * callback for request animation frame. To create line after random time
     */
    createElementOnTimer() {
        setTimeout(() => {
            const parentEl = document.getElementsByClassName('js-application')[0];
            const position = this.random(0, parentEl.offsetWidth);
            this.createELement(position);
            window.requestAnimationFrame(this.createElementOnTimer.bind(this));
        }, this.random(0, 5000));
    }
}
export {BackgroundAnimation};