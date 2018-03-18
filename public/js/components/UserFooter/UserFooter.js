(function () {

    const noop = () => null;

    class UserFooterComponent {
        constructor(elem) {
            this._el = elem;
        }

        set logoutClass(logoutClass) {
            this._logoutClass = logoutClass;
        }

        get data() {
            return this._data;
        }

        set data(data) {
            this._data = data;
        }

        clear() {
            this._el.innerHTML = '<a class="userFooterButton" data-section="login" href="#">Login&nbsp;</a>\n' +
                '            <a class="userFooterButton" data-section="register" href="#">Register</a>';
        }

        render() {
            if (!this._data) {
                return;
            }

            if (!this._logoutClass) {
                console.warn('No logout class defined: ', this._logoutClass, '\nNo render!');
                return;
            }

            this._data['logoutClass'] = this._logoutClass;

            const templateFest = window.fest['js/components/UserFooter/UserFooter.tmpl'](this._data);
            this._el.innerHTML = templateFest;
        }

    }

    window.UserFooterComponent = UserFooterComponent;

})();