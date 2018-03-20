(function () {
    const ColorComponent = window.ColorComponent;
    class Design {
        constructor(qs) {
            this.colorSet = {
                baseColorPurple: ['#e040fb', '#9c23c7', '#2e1e2e'],
                baseColorYellow: ['#ffc107', '#ffa000', ' #2e2e02'],
                baseColorGreen:  ['#689f38', ' #8bc34a', '#1e2e22'],
                baseColorOrange: ['#e64a19', '#ff5722', '#391409'],
                baseColorBlue:   ['#303f9f', '#3f51b5', '#10142b'],
            };
            this.colorSetKeys = ['--baseColor', '--logoColor', '--firstGradientColor'];

            this.colorComponent = new ColorComponent();
            this.paintForm = isQuerySelector('.wrapper-block__change-color');
            document.addEventListener('DOMContentLoaded', this.setRandomScheme.bind(this));
            this.paintForm.addEventListener('mousedown', this.setRandomScheme.bind(this));

            this.elemDom = isQuerySelector(qs);
        }

        static getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        setRandomScheme() {
            let rand = Design.getRandomInt(0, Object.keys(this.colorSet).length);
            let keyRand = Object.keys(this.colorSet)[rand];
            this.colorComponent.setScheme(this.colorSetKeys, this.colorSet[keyRand], this.elemDom);
        }
    }
    window.Design = Design;
})();