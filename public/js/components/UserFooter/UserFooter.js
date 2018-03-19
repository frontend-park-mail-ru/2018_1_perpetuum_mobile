(function () {

    const noop = () => null;

    class UserFooterComponent {
        constructor(elem) {
            this._el = elem;
        }

        set logoutClass(logoutClass) {
            this.logoutClassQs = logoutClass;
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

            if (!this.logoutClassQs) {
                console.warn('No logout class defined: ', this.logoutClassQs, '\nNo render!');
                return;
            }

            this._data['logoutClass'] = this.logoutClassQs;

            const templateFest = window.fest['js/components/UserFooter/UserFooter.tmpl'](this._data);
            this._el.innerHTML = templateFest;
        }

    }

    window.UserFooterComponent = UserFooterComponent;

})();