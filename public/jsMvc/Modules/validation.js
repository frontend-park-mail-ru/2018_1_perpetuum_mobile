/**
 *  @module modules/validation
 */


/** function check email
 * @function isEmail
 * @param {string} email - The string that should be checked it is a email or not.
 * @return {boolean} - Check status.
 * */

function isEmail(email) {
    const  EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_PATTERN.test(email);
}

/** function check allowed characters
 * @function isAllowed
 * @param {string} value - The string that should be checked.
 * @return {boolean} - Check status.
 * */
function isAllowed(value) {
    const EXPR = /^[-0-9a-z@_\-.]+$/i;
    return !EXPR.test(value);
}

/** function check value length
 * @function validateLength
 * @param {string} value - The string that should be checked.
 * @return {boolean} - Check status.
 * */
function validateLength(value) {
    const MIN_LENGTH = 4;
    return ((MIN_LENGTH > value.length) && (value.length > 0));
}

/**
 * Validation class.
 */
class Validation {
    /**
     * Validate login.
     * @static
     * @param {object} evt - The evt invoked on input that should be
     * checked it is a login or not.
     * @return {boolean|string} Check status - true or error description.
     */
    static validateLogin(evt) {
        const login = evt.target.value;
        const stat = !validateLength(login) ? true : 'Too short. Min 4 letters';
        return !isAllowed(login) ? stat : 'Not latin';
    }

    /**
     * Validate password.
     * @static
     * @param {object} evt - The evt invoked on input that should be
     * checked it is a password or not.
     * @return {(boolean|string)} Check status - true or error description.
     */
    static validatePassword(evt) {
        const password = evt.target.value;
        const stat = !validateLength(password) ? true : 'Too short. Min 4 letters';
        return !isAllowed(password) ? stat : 'Not latin';
    }

    /**
     * Validate email.
     * @static
     * @param {object} evt - The evt invoked on input that should be
     * checked it is a email or not.
     * @return {boolean|string} Check status - true or error description.
     */
    static validateEmail(evt) {
        const email = evt.target.value;
        return isEmail(email) ? true : 'This is not email';
    }

    /**
     * Validate email or login.
     * @static
     * @param {object} evt - The evt invoked on input that should be
     * checked it is a login or email or not.
     * @return {boolean|string} Check status - true or error description.
     */
    static validateLoginOrEmail(evt) {
        const loginOrEmail = evt.target.value;
        const stat = isEmail(loginOrEmail) || !validateLength(loginOrEmail) ? true : 'This is not login or email';
        return !isAllowed(loginOrEmail) ? stat : 'This is not latin';
    }

    /**
     * Validate whether password is the same as it is in another field.
     * @static
     * @param {string} className - The input class where is situated password to compare with.
     * @param evt - The event invoked on input of repeat password.
     * @return {boolean|string} Check status - true or error description.
     */
    static validatePasswordRepeat(className, evt) {
        const form = evt.target.form;
        const password = form.getElementsByClassName(className)[0].value;
        const repeatPassword = evt.target.value;

        if (password !== repeatPassword) {
            return 'Passwords do not match';
        }
        return true;
    }


    /**
     * Validate size and type of the image.
     * @static
     * @param {object} file - The file that should be checked.
     * @return {boolean|string} Check status - true or error description.
     */
    static isValidImage(file) {

        const MIME_TYPE = ['image/jpeg', 'image/png', 'image/jpeg'];

        const stat = (MIME_TYPE.indexOf(file.type) !== -1) ? true : 'Wrong img type. Choose jpg/png/jpeg';

        const selectedImageSizeMB = file.size / 1024 / 1024;
        const maxImageSizeMB = 1;

        return (selectedImageSizeMB < maxImageSizeMB) ? stat : `Too big file: ${selectedImageSizeMB.toFixed(2)}MB. Choose file less then ${maxImageSizeMB}MB.`;
    }
}

export {Validation};