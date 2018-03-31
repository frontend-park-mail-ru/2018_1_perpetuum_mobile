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
    const ALLOW_INPUT_LENGTH = 4;
    return ((ALLOW_INPUT_LENGTH > value.length) && (value.length > 0));
}

/** validation class.
 *  @modules /validation
 *  */
class Validation {
    /**
     * validates login
     * @param {string} login - The string that should be checked it is a login or not.
     * @return {(boolean|string)} - Check status - true or error description.
     */
    static validateLogin(login) {
        const stat = !validateLength(login) ? true : 'Too short. Min 4 letters';
        return !isAllowed(login) ? stat : 'Not latin';
    }

    /**
     * validates password
     * @param {string} password - The string that should be checked it is a password or not.
     * @return {(boolean|string)} - Check status - true or error description.
     */
    static validatePassword(password) {
        const stat = !validateLength(password) ? true : 'Too short. Min 4 letters';
        return !isAllowed(password) ? stat : 'Not latin';
    }

    /**
     * validates email
     * @param {string} email - The string that should be checked it is a email or not.
     * @return {(boolean|string)} - Check status - true or error description.
     */
    static validateEmail(email) {
        return isEmail(email) ? true : 'This is not email';
    }

    /**
     * validates email or login
     * @param {string} loginOrEmail - The string that should be checked it is a login oe email or not.
     * @return {(boolean|string)} - Check status - true or error description.
     */
    static validateLoginOrEmail(loginOrEmail) {
        const stat = isEmail(loginOrEmail) || !validateLength(loginOrEmail) ? true : 'This is not login or email';
        return !isAllowed(loginOrEmail) ? stat : 'This is not latin';
    }


    /**
     * validates size and type image
     * @param {Object} file - The file that should be checked.
     * @return {(boolean|string)} - Check status - true or error description.
     */
    static validateImage(file) {

        const MIME_TYPE = ['image/jpeg', 'image/png', 'image/jpeg'];

        const stat = (MIME_TYPE.indexOf(file.type) !== -1) ? true : 'Wrong img type. Choose jpg/png/jpeg';

        const selectedImageSizeMB = file.size / 1024 / 1024;
        const maxImageSizeMB = 1;

        return (selectedImageSizeMB < maxImageSizeMB) ? stat : `Too big file: ${selectedImageSizeMB.toFixed(2)}MB. Choose file less then ${maxImageSizeMB}MB.`;
    }
}

export {Validation};