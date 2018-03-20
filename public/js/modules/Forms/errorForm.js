(function () {
    class ErrorForm {

        static displayErrors(inputForm, stringError) {

            inputForm.classList.remove('input-form_right');
            inputForm.classList.add('input-form_wrong');

            let errorForm = inputForm.parentNode.querySelector('.js-selector-errors');

            if (!errorForm) {
                errorForm = document.createElement('div');
                errorForm.classList.add('js-selector-errors');
            }

            errorForm.innerHTML = stringError;
            inputForm.parentNode.appendChild(errorForm);
            errorForm.classList.add('error-form_input')
        }

        static hideErrors(inputForm) {
            inputForm.classList.add('input-form_right');
            inputForm.classList.remove('input-form_wrong');

            let errorForm = inputForm.parentNode.querySelector('.js-selector-errors');

            if (errorForm) {
                inputForm.parentNode.removeChild(errorForm);
            }
        }

        static removeError(inputForm) {
            inputForm.classList.add('input-form_right');

            let errorForm = inputForm.parentNode.querySelector('.js-selector-errors');

            if (errorForm) {
                inputForm.parentNode.removeChild(errorForm);
            }
            inputForm.classList.remove('input-form_wrong');
            inputForm.classList.remove('input-form_right');
        }
    }

    window.ErrorForm = ErrorForm;
})();