/** @module modules/paginatorModule */


/** Class implements paginator logic. */
class PaginatorModule {

    /**
     * Create a PaginatorModule.
     * PageNum is 1, leftDisabled and rightDisabled indicators are false. */
    constructor() {
        this._pageNum = 1;
        this.leftDisabled = false;
        this.rightDisabled = false;
    }

    /** @type {number} */
    get pageNum() {
        return this._pageNum;
    }

    /** @type {number} */
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

    /** @type {number} */
    get maxPageNum() {
        return this._maxPageNum;
    }

    /** @type {number} */
    set maxPageNum(maxPageNum) {
        if (maxPageNum < 1) {
            maxPageNum = 1;
        }
        this._maxPageNum = maxPageNum;
        this.checkDisabled();
    }

    /** Reset the instance to pageNum = 1
     * @return {PaginatorModule} The current object instance.
     */
    clear() {
        this._pageNum = 1;
        this.checkDisabled();
        return this;
    }

    /**
     * Increment the current page number if possible and set left/right disabled if necessary.
     * @return {number} The current page number.
     */
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

    /**
     * Decrement the current page number if possible and set left/right disabled if necessary.
     * @return {number} The current page number.
     */
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

    /**
     * Set right/left disabled if necessary according to pageNum and maxPageNum.
     * No need to invoke it after changing class elements by methods/setters.
     * @return {PaginatorModule} The current object instance.
     */
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