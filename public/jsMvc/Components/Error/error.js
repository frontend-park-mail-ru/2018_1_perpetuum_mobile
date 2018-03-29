class Error {

    showError(input, errorMessage, errLocation) {
        input.classList.remove('input-form_right');
        input.classList.add('input-form_wrong');
        const errField = document.getElementsByClassName(errLocation)[0];
        errField.innerHTML = '';
        const err = document.createElement('div');
        err.classList.add('error-form__message');
        err.innerHTML = errorMessage;
        errField.appendChild(err);
        return false;
    }

    delError(input, errLocation) {
        const errField = document.getElementsByClassName(errLocation)[0];
        input.classList.remove('input-form_right');
        input.classList.remove('input-form_wrong');
        errField.innerHTML = '';
        return false;
    }

    hideError(input, errLocation) {
        const errField = document.getElementsByClassName(errLocation)[0];
        input.classList.add('input-form_right');
        input.classList.remove('input-form_wrong');
        errField.innerHTML = '';
        return true;
    }

}

const errorForm = new Error();

export {errorForm};