/**
 *  @module components/BackgroundAnimation
 */
class BackgroundAnimation {
    /**
     * return random number
     * @param max {number} - random limit
     * @returns {number} - random number
     */
    random(max) {
        return Math.floor(Math.random() * max);
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
        line.style.backgroundColor = this.colors[this.random(this.colors.length)];
        parentEl.insertAdjacentElement('afterbegin', line);
        line.addEventListener('animationend', () => {
            line.remove();
        });
    }

    /**
     * constructor. Create current class instance
     */
    constructor() {
        this.colors = ['#5FC737', '#5fc737', '#2e1e2e', '#51FF2F', '#2eff97', '#2e2e02', '#689f38', '#8bc34a', '#1e2e22', '#59e6de', '#6cff3f', '#391409', '#929f61', '#3f51b5', '#10142b'];

        document.addEventListener('click', evt => {
            const position = (evt.pageX)? evt.pageX : evt.targetTouches[0].pageX;
            this.createELement(position);
        });

        window.requestAnimationFrame(this.createElementOnTimer.bind(this));
    }

    /**
     * callback for request animation frame. To create line after random time
     */
    createElementOnTimer() {
        setTimeout(() => {
            const parentEl = document.getElementsByClassName('js-application')[0];
            this.createELement(this.random(parentEl.offsetWidth));
            window.requestAnimationFrame(this.createElementOnTimer.bind(this));
        }, this.random(5000));
    }
}
export {BackgroundAnimation};