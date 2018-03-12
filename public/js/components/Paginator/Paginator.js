(function () {

    class PaginatorComponent {
        constructor(selectorLeft, selectorRight) {
            this._pageNum = 1;
            this._left = document.querySelector(selectorLeft);
            this._right = document.querySelector(selectorRight);
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
                this._right.disabled = true;
            }
            this._maxPageNum = maxPageNum;
        }

        clear() {
            this._pageNum = 1;
            this._left.disabled = true;
        }

        increment() {
            this._pageNum++;

            if (this._pageNum > this._maxPageNum) {
                this._pageNum = this._maxPageNum;
            }

            if (this._pageNum === this._maxPageNum) {
                this._right.disabled = true;
            }

            if (this._pageNum > 1) {
                this._left.disabled = false;
            }

            return this._pageNum;
        }

        decrement() {
            this._pageNum--;

            if (this._pageNum > this._maxPageNum) {
                this._pageNum = this._maxPageNum;
            }

            if (this._pageNum <= 1) {
                this._left.disabled = true;
                this._pageNum = 1;
            }

            if (this._pageNum < this._maxPageNum) {
                this._right.disabled = false;
            }

            return this._pageNum;
        }

    }

    window.PaginatorComponent = PaginatorComponent;

})();