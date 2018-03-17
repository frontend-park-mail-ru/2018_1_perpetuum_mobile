(function () {
    class ErrorForm {

        static displayErrors(inputForm, stringError) {

            inputForm.classList.remove('rightInputSize');
            inputForm.classList.add('wrongInputSize');

            let errorForm = inputForm.parentNode.querySelector('.js-selector-errors');

            if (!errorForm) {
                errorForm = document.createElement('div');
                errorForm.classList.add('js-selector-errors');
            }

            errorForm.innerHTML = stringError;
            inputForm.parentNode.appendChild(errorForm);
            errorForm.classList.add('errorForm')
        }

        static hideErrors(inputForm) {
            inputForm.classList.add('rightInputSize');
            inputForm.classList.remove('wrongInputSize');

            let errorForm = inputForm.parentNode.querySelector('.js-selector-errors');

            if (errorForm) {
                inputForm.parentNode.removeChild(errorForm);
            }
        }

        static removeError(inputForm) {
            inputForm.classList.add('rightInputSize');

            let errorForm = inputForm.parentNode.querySelector('.js-selector-errors');

            if (errorForm) {
                inputForm.parentNode.removeChild(errorForm);
            }
            inputForm.classList.remove('wrongInputSize');
            inputForm.classList.remove('rightInputSize');
        }
    }

    window.ErrorForm = ErrorForm;
})();