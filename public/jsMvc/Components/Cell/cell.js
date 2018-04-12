class Cell {
    static setProperty(element, size,  X, Y) {
        element.style.width  = `${size}px`;
        element.style.height = `${size}px`;
        element.wrongX = `${X}px`;
        element.wrongY = `${Y}px`;
        element.style.top  = element.wrongY;
        element.style.left = element.wrongX
    }

    static setPropertyFree(cell, parentElement, colour, sizeCell, i, len) {
        const OFFSET_FROM_ELEMENT = 10;

        const offsetToCenterX = (parentElement.offsetWidth - len * (sizeCell + OFFSET_FROM_ELEMENT)) / 2;
        const offsetToCenterY = (parentElement.offsetHeight - (sizeCell + OFFSET_FROM_ELEMENT)) / 2;
        const x = parentElement.offsetLeft + (OFFSET_FROM_ELEMENT + sizeCell) * i + offsetToCenterX;
        const y = parentElement.offsetTop + offsetToCenterY;
        cell.colour = colour;
        cell.style.backgroundColor = colour;
        cell.classList.add('js-fixed', 'game-blendocu__cell');
        Cell.setProperty(cell, sizeCell, x, y);
    }

    static setPropertyFixed(cell, parentElement, v, sizeCell, sizeX, sizeY) {
        const OFFSET_FROM_ELEMENT = 10;

        const offsetToCenterX = (parentElement.offsetWidth - sizeX * (sizeCell + OFFSET_FROM_ELEMENT)) / 2;
        const offsetToCenterY = (parentElement.offsetHeight - sizeY * (sizeCell + OFFSET_FROM_ELEMENT)) / 2;
        const y = v.y * sizeCell + OFFSET_FROM_ELEMENT * v.y + parentElement.offsetTop + offsetToCenterY;
        const x = v.x * sizeCell + OFFSET_FROM_ELEMENT * v.x + parentElement.offsetLeft + offsetToCenterX;
        Cell.setProperty(cell, sizeCell, x, y);
        if (!v.fixed) {
            cell.classList.add('game-blendocu__cell');
            const tick = document.createElement('div');
            tick.classList.add('game-blendocu__cell-fixed');
            tick.innerText = '✓';
            cell.appendChild(tick);
            cell.style.background = v.colour;
        } else {
            cell.classList.add('game-blendocu__empty-cell', 'js-empty-cell');
            cell.x = v.x;
            cell.y = v.y;
        }
    }

    static findSizeCell(parentElement, X, Y, anotherParent) {
        const OFFSET_FROM_ELEMENT = 10;
        const sizeCellX = parentElement.offsetWidth / X - OFFSET_FROM_ELEMENT * X;
        const sizeCellY = parentElement.offsetHeight / Y - OFFSET_FROM_ELEMENT * Y;
        const sizeCellX1 = anotherParent.offsetWidth - OFFSET_FROM_ELEMENT;
        const sizeCellY1 = anotherParent.offsetHeight - OFFSET_FROM_ELEMENT;

        const temp = (sizeCellX > sizeCellY) ? sizeCellY : sizeCellX;
        const temp1 = (sizeCellX1 > sizeCellY1) ? sizeCellY1 : sizeCellX1;

        return (temp > temp1) ? temp1 : temp;
    }

    static putOnPosition(cell, x, y) {
        cell.style.top = y;
        cell.style.left = x;
    }


}

export {Cell};