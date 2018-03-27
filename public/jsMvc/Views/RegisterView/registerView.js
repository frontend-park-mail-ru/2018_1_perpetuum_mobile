import {ViewInterface} from '../ViewInterface.js';

class RegisterView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/RegisterView/registerView.tmpl');
    }


    render(params) {
        super.render(params);
        this.init();
        return this;
    }

    init() {
        const toRegisterForm = this.el.getElementsByClassName('js-register-form')[0];
        toRegisterForm.addEventListener('submit', this.onRegister);
    }


}

export {RegisterView};