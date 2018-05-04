class BackgroundAnimation {
    constructor() {
        // const line = document.createElement('div');
        // line.classList.add('background-animation');
        // const parentEl = document.getElementsByClassName('js-wrapper-block');
        // const positionX = Math.floor(Math.random() * parentEl.offsetX);
        // line.left = `${positionX}px`;
        document.addEventListener('click', (evt) => {
            this.line = document.createElement('div');
            this.line.classList.add('background-animation');
            const parentEl = document.getElementsByClassName('js-wrapper-block')[0];
            const positionX = (evt.pageX)? evt.pageX : evt.targetTouches[0].pageX;
            this.line.style.left = `${positionX}px`;
            parentEl.appendChild(this.line);
            this.line.addEventListener('animationend', () => {
                this.line.remove();
            });
        });

    }
}
export {BackgroundAnimation};