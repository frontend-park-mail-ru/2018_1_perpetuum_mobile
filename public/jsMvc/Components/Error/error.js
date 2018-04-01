/**
 *  @module components/error
 */


/**
 * Error class to show validation errors.
 */
class Error {

    /**
     * Show error method to show validation error description near inputs.
     * @param {Element} input - wrong input.
     * @param {string} errorMessage - error message to show.
     * @param {string} errLocation - css class to find where to show error.
     * @return {boolean} - To understand what this input value is wrong.
     */
    static showError(input, errorMessage, errLocation) {
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

    /**
     * Delete error method to delete validation error description near empty inputs.
     * @param {Element} input - empty input.
     * @param {string} errLocation - css class to find where to delete error.
     * @return {boolean} - To understand what this input value is wrong.
     */
    static delError(input, errLocation) {
        const errField = document.getElementsByClassName(errLocation)[0];
        input.classList.remove('input-form_right');
        input.classList.remove('input-form_wrong');
        errField.innerHTML = '';
        return false;
    }

    /**
     * Hide error method to hide validation error description near correct inputs.
     * @param {Element} input - correct input.
     * @param {string} errLocation - css class to find where to hide error.
     * @return {boolean} - To understand what this input value is correct.
     */
    static hideError(input, errLocation) {
        const errField = document.getElementsByClassName(errLocation)[0];
        input.classList.add('input-form_right');
        errField.innerHTML = '';
        return true;
    }

    /**
     * Show server response-related errors on form.
     * @param {string} msg - Server response to show.
     */
    static serverError(msg) {
        const serverErr = this.toLoginForm.getElementsByClassName('error-form__server-error')[0];
        serverErr.style = 'display: block';
        serverErr.innerHTML = msg;
    }

    /**
     * Show avatar validation error.
     * @param {string} msg - error description to show.
     * @return {boolean} - To understand what this file is wrong.
     */
    static showAvatarError(msg) {
        const errField = document.getElementsByClassName('js-error-form-image')[0];
        console.log(errField);
        console.log(msg, 'in err');
        errField.innerHTML = msg;
        return false;
    }

    /**
     * Hide avatar validation error.
     * @return {boolean} - To understand what this file is correct.
     */
    static hideAvatarError() {
        const errField = document.getElementsByClassName('js-error-form-image')[0];
        errField.innerHTML = '';
        return true;
    }
}

export {Error};