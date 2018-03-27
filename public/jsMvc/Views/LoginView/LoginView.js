import {ViewInterface} from '../ViewInterface.js';

class LoginView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/LoginView/loginView.tmpl');
    }

    render(params) {
        super.render(params);
        this.init();
        return this;
    }

    init() {
        const toLoginForm = this.el.getElementsByClassName('js-login-form')[0];
        toLoginForm.addEventListener('submit', this.onLogin);
    }


}

export {LoginView};
