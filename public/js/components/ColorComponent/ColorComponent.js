(function () {
    class ColorComponent {
        setScheme(colorSetKeys, colorSet, elemDOM) {
            colorSet.forEach(
                (item, i) => {
                    elemDOM.style.setProperty(colorSetKeys[i], item);
                }
            );
        }
    }
    window.ColorComponent = ColorComponent;
})();