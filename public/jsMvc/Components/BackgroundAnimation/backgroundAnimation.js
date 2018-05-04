class BackgroundAnimation {
    constructor() {
        this.colors = ['#e040fb', '#9c23c7', '#2e1e2e', '#ffc107', '#ffa000', '#2e2e02', '#689f38', '#8bc34a', '#1e2e22', '#e64a19', '#ff5722', '#391409', '#303f9f', '#3f51b5', '#10142b'];
        document.addEventListener('click', (evt) => {
            const line = document.createElement('div');
            line.classList.add('background-animation');
            const parentEl = document.getElementsByClassName('js-application')[0];
            const positionX = (evt.pageX)? evt.pageX : evt.targetTouches[0].pageX;
            line.style.left = `${positionX}px`;
            line.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
            parentEl.insertAdjacentElement('afterbegin', line);
            line.addEventListener('animationend', () => {
                line.remove();
            });
        });

        window.requestAnimationFrame(this.createElementOnTimer.bind(this));
    }

    createElementOnTimer() {
        setTimeout(() => {
            const line = document.createElement('div');
            line.classList.add('background-animation');
            const parentEl = document.getElementsByClassName('js-application')[0];
            const positionX = Math.floor(Math.random() * parentEl.offsetWidth);
            line.style.left = `${positionX}px`;
            parentEl.insertAdjacentElement('afterbegin', line);
            line.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
            line.addEventListener('animationend', () => {
                line.remove();
            });
            window.requestAnimationFrame(this.createElementOnTimer.bind(this));
        }, Math.floor(Math.random() * 10)*1000);
    }
}
export {BackgroundAnimation};