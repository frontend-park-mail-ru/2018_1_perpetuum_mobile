/**
 * @module components/Cell
 */

/**
 * Class for implements methods for cell in game scene
 */

class Cell {
    /**
     * Set css properties to current cell
     * @param cell - the current cell to assign css properties
     * @param size - the current cell size
     * @param X - x position on field
     * @param Y - y position on field
     */
    static setProperty(cell, size,  X, Y) {
        [cell.style.width, cell.style.height]  = [`${size}px`, `${size}px`];
        [cell.wrongX, cell.wrongY] = [`${X}px`, `${Y}px`];
        [cell.style.left, cell.style.top] = [`${X}px`, `${Y}px`];
        cell.fixedCubic = (!!cell.fixedCubic);
    }

    /**
     * set property and position to free cell
     * @param cell {Object} - the current cell to assign css properties
     * @param parentElement {Object} - field in which the cell is located
     * @param colour {String} - background colour
     * @param cubicId {Number} - cubic id for Alice
     * @param sizeCell {Number} - cell size
     * @param i {Number} - cell position relative to others
     * @param len {Number} - number of cells in a row
     */
    static setPoolProperty(cell, parentElement, colour, cubicId, sizeCell, i, len) {
        const OFFSET = 8;
        const offsetToCenterX = (parentElement.offsetWidth  - (sizeCell + OFFSET) * len) / 2;
        const offsetToCenterY = (parentElement.offsetHeight - (sizeCell + OFFSET)) / 2;
        const x = (OFFSET + sizeCell) * i + offsetToCenterX + OFFSET/2;
        const y = parentElement.offsetTop + offsetToCenterY;
        cell.colour = colour;
        cell.style.backgroundColor = colour;
        cell.isBottom = true;
        cell.classList.add('js-fixed', 'game-blendocu__cell');
        Cell.setProperty(cell, sizeCell, x, y);
        if (cubicId) {
            cell.cubicId = cubicId;
        }
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
    static setFixedProperty(cell, parentElement, v, sizeCell, sizeX, sizeY) {
        const OFFSET = 8;

        const offsetToCenterX = (parentElement.offsetWidth - sizeX * (sizeCell + OFFSET)) / 2;
        const offsetToCenterY = (parentElement.offsetHeight - sizeY * (sizeCell + OFFSET)) / 2;
        const y = v.y * sizeCell + OFFSET * v.y + offsetToCenterY  + parentElement.offsetTop;
        const x = v.x * sizeCell + OFFSET * v.x + offsetToCenterX;
        Cell.setProperty(cell, sizeCell, x, y);
        if (v.fixed) {
            cell.classList.add('game-blendocu__cell');
            const tick = document.createElement('div');
            tick.classList.add('game-blendocu__cell-fixed', 'u1f400');
            cell.appendChild(tick);
            cell.style.background = v.colour;
            [cell.x, cell.y] = [v.x, v.y];
            return;
        }
        cell.classList.add('game-blendocu__empty-cell', 'js-empty-cell');
        [cell.x, cell.y] = [v.x, v.y];
    }

    /**
     * cell can be placed in two div, and this method find maximum size to cell so the cells are displayed depending on the screen size
     * @param firstDiv {Object} - field in which the cell can located
     * @param X {Number} - number of cells in a row
     * @param Y {Number} - number of cells in a column
     * @param secondDiv {Object} - field in which the cell can located
     * @param count
     * @returns {number} - minimum cell size depending on the screen size
     */
    static findSizeCell(firstDiv, X, Y, secondDiv, count) {
        const OFFSET = 8;
        const sizeCellX = firstDiv.offsetWidth / X - OFFSET;
        const sizeCellY = firstDiv.offsetHeight / Y - OFFSET;
        const sizeCellX1 = secondDiv.offsetWidth / count - OFFSET;
        const sizeCellY1 = secondDiv.offsetHeight;

        return Math.min(sizeCellX, sizeCellY, sizeCellX1, sizeCellY1);
    }

    /**
     * put cell on position on field
     * @param cell {Object} - the current cell to assign css properties
     * @param x - x position on field
     * @param y - y position on field
     */
    static putOnPosition(cell, x, y) {
        [cell.style.left, cell.style.top] = [x, y];
    }

    /**
     * set property and position to cell in case of resize window
     * @param cell {Object} - the current cell to assign css properties
     * @param firstDiv {Object} - field in which the cell is located
     * @param v {Object} - object with relative cell position
     * @param sizeCell {Number} - cell size
     * @param sizeX {Number} - number of cells in a row
     * @param sizeY {Number} - number of cells in a column
     * @param i {Number} - position i on bottom field
     * @param len {Number} - quantity of cells on bottom field
     * @param secondDiv - div of free element
     */
    static resizeMap(cell, firstDiv, v, sizeCell, sizeX, sizeY, i, len, secondDiv) {
        const OFFSET = 8;

        const offsetToCenterX = (firstDiv.offsetWidth  - sizeX * (sizeCell + OFFSET)) / 2;
        const offsetToCenterY = (firstDiv.offsetHeight - sizeY * (sizeCell + OFFSET)) / 2;
        const y = cell.bottomY * sizeCell + OFFSET * cell.bottomY + offsetToCenterY + firstDiv.offsetTop;
        const x = cell.bottomX * sizeCell + OFFSET * cell.bottomX + offsetToCenterX;

        [cell.style.width, cell.style.height]  = [`${sizeCell}px`, `${sizeCell}px`];
        [cell.style.left, cell.style.top] = [`${x}px`, `${y}px`];

        Cell.setProperty(cell, sizeCell, x, y);

        const xWrong = (OFFSET + sizeCell) * i + (secondDiv.offsetWidth  - (sizeCell + OFFSET) * len) / 2 + OFFSET/2;
        const yWrong = secondDiv.offsetTop + (secondDiv.offsetHeight - (sizeCell + OFFSET)) / 2;

        [cell.wrongX, cell.wrongY] = [`${xWrong}px`, `${yWrong}px`];
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
    static resizePool(cell, parentElement, colour, sizeCell, i, len) {
        const OFFSET = 8;
        const x = (OFFSET + sizeCell) * i + (parentElement.offsetWidth  - (sizeCell + OFFSET) * len) / 2 + OFFSET/2;
        const y = parentElement.offsetTop + (parentElement.offsetHeight - (sizeCell + OFFSET)) / 2;

        Cell.setProperty(cell, sizeCell, x, y);
    }

    /**
     * set border element on cubic pool
     * @param cell - border cubic
     * @param cellTop - current cubic
     */
    static setBorderProperty(cell, cellTop) {
        cellTop.borderElement = cell;
        cell.bottomElement = cellTop;
        cell.classList.add('js-border', 'game-blendocu__border');
        [cell.style.width, cell.style.height]  = [cellTop.style.width, cellTop.style.height];
        [cell.style.left, cell.style.top] = [cellTop.style.left, cellTop.style.top];
    }


    /**
     * resize border in case of resize window
     * @param cell
     */
    static resizeBorderProperty(cell) {
        [cell.style.width, cell.style.height]  = [cell.bottomElement.style.width, cell.bottomElement.style.height];
        [cell.style.left, cell.style.top] = [cell.bottomElement.style.left, cell.bottomElement.style.top];
    }

}

export {Cell};