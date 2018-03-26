(function () {

    const noop = () => null;

    class UserProfileComponent {
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
            this._el.innerHTML = '<div>lol</div>';
        }

        render() {
            if (!this._data) {
                return;
            }

            const templateFest = window.fest['js/components/UserProfile/UserProfile.tmpl'](this._data);

            this._el.innerHTML = templateFest;
        }

    }

    window.UserProfileComponent = UserProfileComponent;

})();