class Cell {
    static setProperty(element, size,  X, Y) {
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        element.wrongX =  X + 'px';
        element.wrongY = Y + 'px';
        element.style.top = Y + 'px';
        element.style.left = X + 'px';
    }

    static findSizeCell(parentElement, X, Y) {
        const sizeCellX = parentElement.offsetWidth / X - 10 * X;
        const sizeCellY = parentElement.offsetHeight / Y - 10 * Y;

        return (sizeCellX > sizeCellY) ? sizeCellY : sizeCellX;
    }
}

export {Cell};