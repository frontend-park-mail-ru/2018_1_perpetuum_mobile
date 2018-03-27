class PaginatorModule {
    constructor(leftEl, rightEl) {
        this._pageNum = 1;
        this.leftDisabled = true;
        this.rightDisabled = false;
    }

    get pageNum() {
        return this._pageNum;
    }

    get maxPageNum() {
        return this._maxPageNum;
    }

    set maxPageNum(maxPageNum) {
        if (this._pageNum > maxPageNum) {
            this._pageNum = maxPageNum;
            this.rightDisabled = true;
        }
        this._maxPageNum = maxPageNum;
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

}

export {PaginatorModule};