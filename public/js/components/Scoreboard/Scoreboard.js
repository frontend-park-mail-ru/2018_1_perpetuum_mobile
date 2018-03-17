(function () {

    class ScoreboardComponent {
        constructor(elem) {
            this._el = elem;
        }

        get data() {
            return this._data;
        }

        set data(data) {
            this._data = data;
        }

        clear() {
            this._el.innerHTML = '';
        }

        render() {
            if (!this._data) {
                return;
            }

            const templateFest = window.fest['js/components/Scoreboard/Scoreboard.tmpl'](this._data);
            this._el.innerHTML = templateFest;
        }

    }

    window.ScoreboardComponent = ScoreboardComponent;

})();
