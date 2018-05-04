class BackgroundAnimation {
    constructor() {
        // const line = document.createElement('div');
        // line.classList.add('background-animation');
        // const parentEl = document.getElementsByClassName('js-wrapper-block');
        // const positionX = Math.floor(Math.random() * parentEl.offsetX);
        // line.left = `${positionX}px`;
        document.addEventListener('click', (evt) => {
            const line = document.createElement('div');
            //const lineBack = document.createElement('div');
            //lineBack.classList.add('background-animation');
            // line.classList.add('background-animation');
            const parentEl = document.getElementsByClassName('js-wrapper-block')[0];
            const positionX = (evt.pageX)? evt.pageX : evt.targetTouches[0].pageX;
            line.style.left = `${positionX}px`;
            //line.style.left = `${positionX + Math.floor(Math.random())}px`;
            parentEl.appendChild(line);
            //parentEl.appendChild(lineBack);
            line.addEventListener('animationend', () => {
                line.remove();
                //lineBack.remove();
            });
        });
    }

    createElementOnTimer() {

    }
}
export {BackgroundAnimation};