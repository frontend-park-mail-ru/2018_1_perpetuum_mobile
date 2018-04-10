import {ViewInterface} from '../ViewInterface.js';
import {Cell} from '../../Components/Cell/cell.js';

class GameView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/GameView/gameView.tmpl');
    }
    render(params = {}) {

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

    drawFree(freeX, freeY, sizeCell) {
        const free = this.params.cells.filter(v => v.fixed);

        free.forEach((v, i) => {
            const colourFree = document.createElement('div');
            const x = freeX + 10 * i + sizeCell * i;
            const y = freeY;
            colourFree.classList.add('js-fixed', 'game-blendocu__cell');
            Cell.setProperty(colourFree, sizeCell, x, y);
            colourFree.colour = v.colour;

            colourFree.style.background = v.colour;

            this.element.appendChild(colourFree);
        });
    }

    drawFixed(fixedX, fixedY, sizeCell) {
        this.params.cells.forEach(v => {
            const cell = document.createElement('div');
            const y = v.y * sizeCell + 10 * v.y + this.element.offsetTop + fixedY;
            const x = v.x * sizeCell + 10 * v.x + this.element.offsetLeft + fixedX;
            Cell.setProperty(cell, sizeCell, x, y);
            !(v.fixed) ? cell.classList.add('game-blendocu__cell') : cell.classList.add('game-blendocu__empty-cell', 'js-empty-cell');
            if (!v.fixed) {
                cell.style.background = v.colour;
            } else {
                cell.x = v.x;
                cell.y = v.y;
            }

            this.element.appendChild(cell);
        });
    }


    drawField() {
        const sizeCell = Cell.findSizeCell(this.element, this.params.countX, this.params.countY);

        this.drawFixed(200, 0, sizeCell);
        this.drawFree(600, 500, sizeCell);
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
                    cell.x = lol.x;
                    cell.y = lol.y;
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
                    this.setCubic({x: cell.x, y: cell.y, colour: cell.colour});
                }
            };

            cell.ondragstart = () => false;
        };
    }
}

export {GameView};
