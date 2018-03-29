import {isLogin, isLatin, isPassword, isEmail} from "./basic.js";

class Validation {
    static validateLogin(login) {
        const stat = !isLogin(login) ? true : 'Too short. Min 4 letters';
        return !isLatin(login) ? stat : 'Not latin';
    }

    static validatePassword(password) {
        const stat = !isPassword(password) ? true : 'Too short. Min 4 letters';
        return !isLatin(password) ? stat : 'Not latin';
    }

    static validateEmail(email) {
        return isEmail(email) ? true : 'This is not email';
    }

    static validateLoginOrEmail(login) {
        const stat = isEmail(login) || !isLogin(login) ? true : 'This is not login or email';
        return !isLatin(login) ? stat : 'This is not latin';
    }
}

export {Validation};