class Cell {
    static setProperty(element, size,  X, Y, parentElement) {
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        element.wrongX =  Y * size + 10 * Y + parentElement.offsetTop  + 'px';
        element.wrongY = X * size + 10 * Y + parentElement.offsetLeft + 'px';
        element.style.top = element.wrongY;
        element.style.left = element.wrongX;
    }
}

export {Cell};