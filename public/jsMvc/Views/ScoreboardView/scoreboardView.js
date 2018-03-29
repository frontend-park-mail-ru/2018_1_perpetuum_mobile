import {ViewInterface} from '../ViewInterface.js';
import {sharedData} from '../../Modules/sharedData.js';

class ScoreboardView extends ViewInterface {
    constructor() {
        super('jsMvc/Views/ScoreboardView/scoreboardView.tmpl');
    }

    render(params = {}) {
        if (Object.keys(params).length === 0 && params.constructor === Object) {
            this.onOpenPage();
            return this;
        }
        if (!params['paginator']) {
            this.onOpenPage({page: +params.urlParams[0]});
            return this;
        }
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

        const leftPaginatorButton = this.el.getElementsByClassName('js-scoreboardPaginatorButtonLeft')[0];
        leftPaginatorButton.addEventListener('click', this.onPaginatorLeft);

        const rightPaginatorButton = this.el.getElementsByClassName('js-scoreboardPaginatorButtonRight')[0];
        rightPaginatorButton.addEventListener('click', this.onPaginatorRight);
    }
}

export {ScoreboardView};