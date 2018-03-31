/**
 * @module models/userModel
 */

import {HttpModule, baseUrl} from '../Modules/HttpModule.js';


/**
 * User Model.
 * The class which send user data to and load data from server.
 */
class UserModel {

    /**
     * Change user avatar.
     * @param {object} data - The object contains image.
     * @return {Promise<Object|Error>} The promise with object with success message or
     * Error with error message.
     */
    changeImage(data) {

        return HttpModule.doPostDataFetch({url: `${baseUrl}/change_avatar`, data: data})
    }

    /**
     * Change user email/login/password.
     * @param {object} data - The object contains data about new email/login/password and old password.
     * @return {Promise<Object|Error>} The promise with object with success message or
     * Error with error message.
     */
    changeProfile(data) {

        return HttpModule.doPostFetch({url: `${baseUrl}/settings`, data: data});
    }

    /**
     * Login user.
     * @param {object} data - The object contains data about email/login and password.
     * @return {Promise<Object|Error>} The promise with object with success message or
     * Error with error message.
     */
    login(data) {

        return HttpModule.doPostFetch({url: `${baseUrl}/login`, data: data});
    }

    /**
     * Register user.
     * @param {object} data - The object contains data about email, login and password.
     * @return {Promise<Object|Error>} The promise with object with success message or
     * Error with error message.
     */
    register(data) {

        return HttpModule.doPostFetch({url: `${baseUrl}/register`, data: data});
    }

    /**
     * Logout user.
     * @return {Promise<Object|Error>} The promise with object with success message or
     * Error with error message.
     */
    logout() {

        return HttpModule.doPostFetch({url: `${baseUrl}/logout`});
    }

    /**
     * Load info about current user.
     * @return {Promise<Object|Error>} The promise with object with user info or
     * Error with error message.
     */
    loadMe() {

        return HttpModule.doGetFetch({url: `${baseUrl}/me`});
    }
}

export {UserModel};