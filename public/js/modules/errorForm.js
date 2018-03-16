(function () {
    class ErrorForm {

        constructor() {
            this.err = false;
        }

        displayErrors(selector) {
            const errorForm = document.querySelector(selector + ' .error');
            const inputForm = document.querySelector(selector + ' .inputSize');

            inputForm.classList.remove('rightInputSize');
            inputForm.classList.add('wrongInputSize');
            errorForm.style.display = 'block';

            this.err = true;
        }

        hideErrors(selector) {
            const errorForm = document.querySelector(selector + ' .error');
            const inputForm = document.querySelector(selector + ' .inputSize');

            errorForm.style.display = 'none';
            inputForm.classList.add('rightInputSize');

            this.err = false;
        }

        getErr() {
            return this.err;
        }
    }
    window.ErrorForm = ErrorForm;
})();