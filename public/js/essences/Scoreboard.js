(function () {

    const ScoreboardComponent = window.ScoreboardComponent;
    const PaginatorModule = window.PaginatorModule;


    function loadAllUsers(data) {
        return httpModule.doPostFetch({url: httpModule.baseUrl + '/users', data: data});
    }


    class Scoreboard {

        set scoreboardTable(qs) {
            if (this._scoreboardTable != null) {
                this._scoreboardTableComponent.clear();
            }
            this._scoreboardTable = isQuerySelector(qs);
            this._scoreboardTableComponent = new ScoreboardComponent(this._scoreboardTable);

            this.reload();
        }

        setPaginator(leftQs, rightQs){
            if (this._leftPage) {
                this._leftPage.removeEventListener('click', this.onSubmitScoreboardPaginatorLeftForm);
            }

            if (this._rightPage) {
                this._rightPage.removeEventListener('click', this.onSubmitScoreboardPaginatorRightForm);
            }

            this._leftPage = isQuerySelector(leftQs);
            this._rightPage = isQuerySelector(rightQs);

            this._leftPage.addEventListener('click', this.onSubmitScoreboardPaginatorLeftForm.bind(this));
            this._rightPage.addEventListener('click', this.onSubmitScoreboardPaginatorRightForm.bind(this));

            this._paginator = new PaginatorModule(this._leftPage, this._rightPage);
        }


        onSubmitScoreboardPaginatorLeftForm(evt) {
            evt.preventDefault();

            const page = {
                page: this._paginator.decrement()
            };

            this.reload(page);
        }

        onSubmitScoreboardPaginatorRightForm(evt) {
            evt.preventDefault();

            const page = {
                page: this._paginator.increment()
            };

            this.reload(page);
        }

        reload(page = { page : 1 }){
            loadAllUsers(page).then(
                (data) => {
                    data['currentPage'] = this._paginator.pageNum; // for template user enumeration rendering
                    this._scoreboardTableComponent.data = data;
                    this._scoreboardTableComponent.render();
                    this._paginator.maxPageNum = data['maxPageNum'];
                }
            );
        }
    }

    window.Scoreboard = Scoreboard;
})();