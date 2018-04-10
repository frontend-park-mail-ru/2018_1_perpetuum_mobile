import {ViewInterface} from '../ViewInterface.js';
import {Cell} from "../../Components/Cell/cell.js";

class GameView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/GameView/gameView.tmpl');
    }
    render(params = {}) {
        /*params =   {
            countX: 5,
            countY: 5,
            cells: [{
                    x: 0,
                    y: 0,
                    fixed: false,
                    colour: "#691f23"
                },
                {
                    x: 0,
                    y: 2,
                    fixed: true,
                    colour: "#875a03"
                },
                {
                    x: 0,
                    y: 1,
                    fixed: true,
                    colour: "#993d0c"
                },
                {
                    x: 1,
                    y: 0,
                    fixed: true,
                    colour: "#245b99"
                },
                {
                    x: 4,
                    y: 4,
                    fixed: true,
                    colour: "#245b99"
                },
                {
                    x: 4,
                    y: 3,
                    fixed: true,
                    colour: "#245b99"
                },
                {
                    x: 2,
                    y: 2,
                    fixed: true,
                    colour: "#245b99"
                }
               ]
        };*/
        if (Object.keys(params).length === 0 && params.constructor === Object) {
            this.openLevel();
            return this;
        }

        if (!params['cells']) {
            this.openLevel({mapNum: +params.urlParams[0]});
            return this;
        }

        super.render(params);
        this.init();
        this.params = params;
        this.element = this.el.getElementsByClassName('js-game')[0];
        this.drawField();
        return this;
    }

    drawField() {
        const sizeCellX = this.element.offsetWidth / this.params.countX - 10 * this.params.countX;
        const sizeCellY = this.element.offsetHeight / this.params.countY - 10 * this.params.countY;

        const sizeCell = (sizeCellX > sizeCellY) ? sizeCellY:sizeCellX;

        this.params.cells.forEach((v, i) => {
            const cell = document.createElement('div');
            cell.style.width = sizeCell + 'px';
            cell.style.height = sizeCell + 'px';
            cell.style.top = v.y * sizeCell + 10 * v.y + this.element.offsetTop  + 'px';
            cell.style.left = v.x * sizeCell + 10 * v.x + this.element.offsetLeft + 'px';
            !(v.fixed) ? cell.classList.add('game-blendocu__cell', 'js-cell') : cell.classList.add('game-blendocu__empty-cell', 'js-empty-cell');
            if (!v.fixed) {
                cell.style.background = v.colour;
            }
            this.element.appendChild(cell);
        });

        const free =this.params.cells.filter(v => {
            return v.fixed;
        });

        free.forEach((v, i) => {
            const colourFree = document.createElement('div');
            colourFree.classList.add('js-fixed', 'game-blendocu__cell');
            colourFree.style.width = sizeCell + 'px';
            colourFree.style.height = sizeCell + 'px';
            colourFree.style.background = v.colour;
            colourFree.wrongX = 600 + 10 * i + sizeCell * i + 'px';
            colourFree.wrongY = 500 + 'px';
            colourFree.style.left = colourFree.wrongX;
            colourFree.style.top = colourFree.wrongY;
            this.element.appendChild(colourFree);
        });
    }

    init() {
        document.onmousedown = evt => {
            const cell = evt.target;
            if (cell.className.indexOf('js-fixed') === -1) return;

            const shiftX = evt.pageX - cell.getBoundingClientRect().left + pageXOffset;
            const shiftY = evt.pageY - cell.getBoundingClientRect().top + pageYOffset;

            this.element.appendChild(cell);

            document.onmousemove = evt => {
                cell.hidden = true;
                const lol = document.elementFromPoint(evt.pageX, evt.pageY);
                (lol.className.indexOf('js-empty-cell') !== -1) ? cell.canDrag = true : cell.canDrag = false;
                cell.hidden = false;
                cell.style.left = `${evt.pageX - shiftX}px`;
                cell.style.top = `${evt.pageY - shiftY}px`;
                if (cell.canDrag) {
                    cell.currentY = getComputedStyle(lol).top;
                    cell.currentX = getComputedStyle(lol).left;
                }
            };

            cell.onmouseup = () => {
                document.onmousemove = null;
                cell.onmouseup = null;
                if (!cell.canDrag) {
                    cell.style.top = cell.wrongY;
                    cell.style.left = cell.wrongX;
                } else {
                    cell.style.left = cell.currentX;
                    cell.style.top  = cell.currentY;
                }
            };

            cell.ondragstart = () => false;
        };

    }

}

export {GameView};
