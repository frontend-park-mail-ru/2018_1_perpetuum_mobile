(function () {
    class ErrorForm {

        constructor() {
            this.err = false;
        }

        displayErrors(selector, stringError) {
            const inputForm = document.querySelector(selector + ' .inputSize');

            inputForm.classList.remove('rightInputSize');
            inputForm.classList.add('wrongInputSize');

            let errorForm = document.querySelector(selector + ' .js-selector-errors');

            if (!errorForm) {
                errorForm = document.createElement('div');
                errorForm.classList.add('js-selector-errors');
            }

            errorForm.innerHTML = stringError;
            inputForm.parentNode.appendChild(errorForm);

            this.err = true;
        }

        hideErrors(selector) {
            const inputForm = document.querySelector(selector + ' .inputSize');
            inputForm.classList.add('rightInputSize');
            inputForm.classList.remove('wrongInputSize');

            let errorForm = document.querySelector(selector + ' .js-selector-errors');

            if (errorForm) {
                inputForm.parentNode.removeChild(errorForm);
            }

            this.err = false;
        }

        removeError(selector) {
            const inputForm = document.querySelector(selector + ' .inputSize');
            inputForm.classList.add('rightInputSize');

            let errorForm = document.querySelector(selector + ' .js-selector-errors');

            if (errorForm) {
                inputForm.parentNode.removeChild(errorForm);
            }
            inputForm.classList.remove('wrongInputSize');
            inputForm.classList.remove('rightInputSize');

            this.err = true;
        }

        getErr() {
            return this.err;
        }
    }
    window.ErrorForm = ErrorForm;
})();