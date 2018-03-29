import {ScoreboardView} from '../Views/ScoreboardView/scoreboardView.js';
import {ScoreboardModel} from '../Models/scoreboardModel.js';

import {PaginatorModule} from '../Modules/paginator.js';
import {bus} from '../Modules/bus.js';

class ScoreboardController {

    constructor() {
        this.scoreboardView = new ScoreboardView();

        this.scoreboardModel = new ScoreboardModel();

        this.paginator = new PaginatorModule();

        this.scoreboardView.onPaginatorLeft = this.onPaginatorLeft.bind(this);
        this.scoreboardView.onPaginatorRight = this.onPaginatorRight.bind(this);
        this.scoreboardView.onOpenPage = this.openPage.bind(this);
    }

    onPaginatorLeft(evt) {
        evt.preventDefault();

        const page = {
            page: this.paginator.decrement()
        };

        this.openPage(page);
    }

    onPaginatorRight(evt) {
        evt.preventDefault();

        const page = {
            page: this.paginator.increment()
        };

        this.openPage(page);
    }

    openPage(page = { page : 1 }){
        this.scoreboardModel.loadAllUsers(page).then(
            (data) => {
                console.log(page);
                this.paginator.maxPageNum = data['maxPageNum'];
                this.paginator.pageNum = page.page;
                data['paginator'] = this.paginator;
                bus.emit('scoreboard', [data, `/${page.page}`]);
                /*data['currentPage'] = this._paginator.pageNum; // for template user enumeration rendering
                this._scoreboardTableComponent.data = data;
                this._scoreboardTableComponent.render();
                this._paginator.maxPageNum = data['maxPageNum'];*/
            }
        );
    }
}

export {ScoreboardController};