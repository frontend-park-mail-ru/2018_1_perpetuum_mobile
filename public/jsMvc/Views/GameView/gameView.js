import {ViewInterface} from '../ViewInterface.js';

class GameView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/GameView/gameView.tmpl');
    }
    render(params = {}) {
        params =   {
            countX: 2,
            countY: 3,
            cells: [{
                    x: 0,
                    y: 0,
                    fixed: "false",
                    colour: "#691f23"
                },
                {
                    x: 0,
                    y: 2,
                    fixed: "true",
                    colour: "#875a03"
                },
                {
                    x: 0,
                    y: 1,
                    fixed: "false",
                    colour: "#993d0c"
                },
                {
                    x: 1,
                    y: 0,
                    fixed: "false",
                    colour: "#245b99"
                },
               ]
        };
        super.render(params);
        this.init();
        this.params = params;
        this.element = this.el.getElementsByClassName('js-game')[0];
        this.draw();
        return this;
    }

    draw() {
        const sizeCellX = this.element.offsetWidth / this.params.countX - 10 * this.params.countX;
        const sizeCellY = this.element.offsetHeight / this.params.countY - 10 * this.params.countY;

        const sizeCell = (sizeCellX > sizeCellY) ? sizeCellY:sizeCellX;

        this.params.cells.forEach((v, i) => {
            const cell = document.createElement('div');
            cell.classList.add('game-blendocu__cell');
            cell.style.width = sizeCell + 'px';
            cell.style.height = sizeCell + 'px';
            cell.wrongX =  v.x * sizeCell + 10 * v.x + this.element.offsetLeft + 'px';
            cell.wrongY = v.y * sizeCell + 10 * v.y + this.element.offsetTop  + 'px';
            cell.style.top = cell.wrongY;
            cell.style.left = cell.wrongX;
            cell.style.background = v.colour;
            this.element.appendChild(cell);
        });

    }

    init() {
        document.onmousedown = evt => {
            const cell = evt.target;
            if (cell.className.indexOf('game-blendocu__cell') === -1) return;

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
                //{cell.style.top, cell.style.left} cell.canDrag ? {cell.wrongY, cell.wrongX} : {cell.currentY, cell.currentX};
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
