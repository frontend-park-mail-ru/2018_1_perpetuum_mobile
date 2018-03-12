(function () {
    noop = () => null;
	class ScoreboardComponent {
		constructor(selector = 'body', {event = 'click', callback = noop} = {}) {
			this._el = document.querySelector(selector);
			this._event = event;
			this._callback = callback;
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
