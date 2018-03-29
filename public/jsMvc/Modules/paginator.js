class PaginatorModule {
    constructor() {
        this._pageNum = 1;
        this.leftDisabled = false;
        this.rightDisabled = false;
    }

    get pageNum() {
        return this._pageNum;
    }

    set pageNum(pageNum) {

        if (pageNum < 1) {
            pageNum = 1;
            this.leftDisabled = true;
        }

        if (pageNum > this._maxPageNum) {
            pageNum = this._maxPageNum;
        }

        this._pageNum = pageNum;

        this.checkDisabled();
    }

    get maxPageNum() {
        return this._maxPageNum;
    }

    set maxPageNum(maxPageNum) {
        this._maxPageNum = maxPageNum;
        this.checkDisabled();
    }

    clear() {
        this._pageNum = 1;
        this.leftDisabled = true;
    }

    increment() {
        this._pageNum++;

        if (this._pageNum > this._maxPageNum) {
            this._pageNum = this._maxPageNum;
        }

        if (this._pageNum === this._maxPageNum) {
            this.rightDisabled = true;
        }

        if (this._pageNum > 1) {
            this.leftDisabled = false;
        }

        return this._pageNum;
    }

    decrement() {
        this._pageNum--;

        if (this._pageNum > this._maxPageNum) {
            this._pageNum = this._maxPageNum;
        }

        if (this._pageNum <= 1) {
            this.leftDisabled = true;
            this._pageNum = 1;
        }

        if (this._pageNum < this._maxPageNum) {
            this.rightDisabled = false;
        }

        return this._pageNum;
    }

    checkDisabled() {
        if (this._pageNum >= this._maxPageNum) {
            this.rightDisabled = true;
        }
        else {
            this.rightDisabled = false;
        }

        if (this._pageNum <= 1) {
            this.leftDisabled = true;
        }
        else {
            this.leftDisabled = false;
        }
        return this;
    }

}

export {PaginatorModule};