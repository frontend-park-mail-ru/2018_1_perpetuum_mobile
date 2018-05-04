/**
 * @module components/Cell
 */

/**
 * Class for implements methods for cell in game scene
 */

class Cell {
    /**
     * Set css properties to current cell
     * @param element - the current cell to assign css properties
     * @param size - the current cell size
     * @param X - x position on field
     * @param Y - y position on field
     */
    static setProperty(element, size,  X, Y) {
        element.style.width  = `${Cell.findVmin(size)}vmin`;
        element.style.height = `${Cell.findVmin(size)}vmin`;
        element.wrongX = `${Cell.findWidth(X)}vw`;
        element.wrongY = `${Cell.findHeight(Y)}vh`;
        element.style.top  = element.wrongY;
        element.style.left = element.wrongX;
    }

    /**
     * set property and position to free cell
     * @param cell {Object} - the current cell to assign css properties
     * @param parentElement {Object} - field in which the cell is located
     * @param colour {String} - background colour
     * @param sizeCell {Number} - cell size
     * @param i {Number} - cell position relative to others
     * @param len {Number} - number of cells in a row
     */
    static setPropertyFree(cell, parentElement, colour, sizeCell, i, len) {
        const OFFSET_FROM_ELEMENT = 8;

        const offsetToCenterX = (parentElement.offsetWidth - len * (sizeCell + OFFSET_FROM_ELEMENT)) / 2;
        const offsetToCenterY = (parentElement.offsetHeight - (sizeCell + OFFSET_FROM_ELEMENT)) / 2;
        const x = parentElement.offsetLeft + (OFFSET_FROM_ELEMENT + sizeCell) * i + offsetToCenterX + OFFSET_FROM_ELEMENT/2;
        const y = parentElement.offsetTop + offsetToCenterY;
        cell.colour = colour;
        cell.style.backgroundColor = colour;
        cell.classList.add('js-fixed', 'game-blendocu__cell');
        Cell.setProperty(cell, sizeCell, x, y);
    }

    /**
     * set property and position to others cell
     * @param cell {Object} - the current cell to assign css properties
     * @param parentElement {Object} - field in which the cell is located
     * @param v {Object} - object with relative cell position
     * @param sizeCell {Number} - cell size
     * @param sizeX {Number} - number of cells in a row
     * @param sizeY {Number} - number of cells in a column
     */
    static setPropertyFixed(cell, parentElement, v, sizeCell, sizeX, sizeY) {
        const OFFSET_FROM_ELEMENT = 8;

        const offsetToCenterX = (parentElement.offsetWidth - sizeX * (sizeCell + OFFSET_FROM_ELEMENT)) / 2;
        const offsetToCenterY = (parentElement.offsetHeight - sizeY * (sizeCell + OFFSET_FROM_ELEMENT)) / 2;
        const y = v.y * sizeCell + OFFSET_FROM_ELEMENT * v.y + parentElement.offsetTop + offsetToCenterY;
        const x = v.x * sizeCell + OFFSET_FROM_ELEMENT * v.x + parentElement.offsetLeft + offsetToCenterX + OFFSET_FROM_ELEMENT/2;
        Cell.setProperty(cell, sizeCell, x, y);
        if (!v.fixed) {
            cell.classList.add('game-blendocu__cell');
            const tick = document.createElement('div');
            tick.classList.add('game-blendocu__cell-fixed', 'u1f400');
            cell.appendChild(tick);
            cell.style.background = v.colour;
        } else {
            cell.classList.add('game-blendocu__empty-cell', 'js-empty-cell');
            cell.x = v.x;
            cell.y = v.y;
        }
    }

    /**
     * cell can be placed in two div, and this method find minimum size to cell so the cells are displayed depending on the screen size
     * @param parentElement {Object} - field in which the cell can located
     * @param X {Number} - number of cells in a row
     * @param Y {Number} - number of cells in a column
     * @param anotherParent {Object} - field in which the cell can located
     * @param count
     * @returns {number} - minimum cell size depending on the screen size
     */
    static findSizeCell(parentElement, X, Y, anotherParent, count) {
        const OFFSET_FROM_ELEMENT = 8;
        const sizeCellX = parentElement.offsetWidth / X - OFFSET_FROM_ELEMENT ;
        const sizeCellY = parentElement.offsetHeight / Y - OFFSET_FROM_ELEMENT ;
        const sizeCellX1 = anotherParent.offsetWidth / count - OFFSET_FROM_ELEMENT;
        const sizeCellY1 = anotherParent.offsetHeight;

        const temp = (sizeCellX > sizeCellY) ? sizeCellY : sizeCellX;
        const temp1 = (sizeCellX1 > sizeCellY1) ? sizeCellY1 : sizeCellX1;
        return (temp > temp1) ? temp1 : temp;
    }

    /**
     * find vmin of cell
     * @param size{number} - size of cell in pixels
     * @returns {number} - cell's size in vmin
     */
    static findVmin(size) {
        const screen = document.getElementsByClassName('js-wrapper-block')[0];
        const vminDevice = (screen.offsetWidth > screen.offsetHeight) ? screen.offsetHeight : screen.offsetWidth;
        return 100 * size / vminDevice;
    }

    /**
     * find vw of pixels
     * @param X{number} - current height in pixels
     * @returns {number} - width in vw
     */
    static findWidth(X) {
        const screen = document.getElementsByClassName('js-wrapper-block')[0];
        return 100 * X / screen.offsetWidth;
    }
    /**
     * find vh of pixels
     * @param Y{number} - current width in pixels
     * @returns {number} - width in vh
     */
    static findHeight(Y) {
        const screen = document.getElementsByClassName('js-wrapper-block')[0];
        return 100 * Y / screen.offsetHeight;
    }

    /**
     * put cell on position on field
     * @param cell {Object} - the current cell to assign css properties
     * @param x - x position on field
     * @param y - y position on field
     */
    static putOnPosition(cell, x, y) {
        cell.style.top = y;
        cell.style.left = x;
    }
}

export {Cell};