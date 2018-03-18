(function () {

    const noop = () => null;

    class UserFooterComponent {
        constructor(elem, {invokeOnClass = 'body', event = 'submit', callback = noop}) {
            this._el = elem;
            this._event = event;
            this._callback = callback;
            this._logoutClass = invokeOnClass;
        }

        get data() {
            return this._data;
        }

        set data(data) {
            this._data = data;
        }

        clear() {
            // delete if had been authorized and invoked logout
            const findLogout = document.getElementsByClassName(this._logoutClass)[0];
            if (findLogout != null) {
                findLogout.removeEventListener(this._event, this._callback);
            }
            this._el.innerHTML = '<a data-section="login" href="#">Log in&nbsp;</a>|&nbsp;<a data-section="register" href="#">Register</a>';
        }

        render() {
            if (!this._data) {
                return;
            }

            // delete if had been authorized and rerendered
            let findLogout = document.getElementsByClassName(this._logoutClass)[0];
            if (findLogout != null) {
                findLogout.removeEventListener(this._event, this._callback);
            }

            this._data['logoutClass'] = this._logoutClass;

            const templateFest = window.fest['js/components/UserFooter/UserFooter.tmpl'](this._data);
            this._el.innerHTML = templateFest;
            findLogout = document.getElementsByClassName(this._logoutClass)[0];
            findLogout.addEventListener(this._event, this._callback); // will be deleted when logout or rerendered
        }

    }

    window.UserFooterComponent = UserFooterComponent;

})();