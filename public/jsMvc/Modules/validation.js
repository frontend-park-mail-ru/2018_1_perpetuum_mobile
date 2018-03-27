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
        console.log(isEmail(email));
        return isEmail(email) ? true : 'This is not email';
    }
}

export {Validation};