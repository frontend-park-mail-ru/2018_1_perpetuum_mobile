(function () {
    class ColorComponent {
        static getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        //TODO: dimina function
        constructor(elemDOM) {
            this.elemDOM = document.querySelector(elemDOM);
            this.colorSet = {
                baseColorPurple: ['#e040fb', '#9c23c7', '#2e1e2e'],
                baseColorYellow: ['#ffc107', '#ffa000', ' #2e2e02'],
                baseColorGreen:  ['#689f38', ' #8bc34a', '#1e2e22'],
                baseColorOrange: ['#e64a19', '#ff5722', '#391409'],
                baseColorBlue:   ['#303f9f', '#3f51b5', '#10142b'],
            };
            this.colorSetKeys = ['--baseColor', '--logoColor', '--firstGradientColor'];
        }

        setRandomScheme() {
            let rand = ColorComponent.getRandomInt(0, Object.keys(this.colorSet).length);
            let keyRand = Object.keys(this.colorSet)[rand];
            this.setScheme(keyRand);
        }

        setScheme(schemeName) {
            const scheme = this.colorSet[schemeName];
            scheme.forEach(
                (item, i) => {
                    this.elemDOM.style.setProperty(this.colorSetKeys[i], item);
                }
            );
        }
    }
    window.ColorComponent = ColorComponent;
})();