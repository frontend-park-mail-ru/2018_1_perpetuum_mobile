import {ViewInterface} from '../ViewInterface.js';
import {sharedData} from '../../Modules/sharedData.js';

class MenuView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/MenuView/menuView.tmpl');
    }

    render(params = {}) {
        params.sharedData = sharedData.data;
        super.render(params);
        this.init();
        return this;
    }

    init() {
        if (sharedData.data['currentUser']) {
            const toLogoutForm = this.el.getElementsByClassName('js-logout-form')[0];
            toLogoutForm.addEventListener('submit', this.onLogout);
        }

    }

}

export {MenuView};