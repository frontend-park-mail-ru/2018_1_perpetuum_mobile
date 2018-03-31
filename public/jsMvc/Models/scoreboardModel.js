/**
 * @module models/scoreboardModel
 */

import {HttpModule, baseUrl} from '../Modules/HttpModule.js';


/**
 * Scoreboard Model.
 * The class which send scoreboard data to and load data from server.
 */
class ScoreboardModel {

    /**
     * Load all users for scoreboard.
     * @param {object} data - The object contains page info.
     * @return {Promise<Object|Error>} The promise with object with scoreboard info or
     * Error with error message.
     */
    loadAllUsers(data) {
        return HttpModule.doPostFetch({url: `${baseUrl}/users`, data: data});
    }
}

export {ScoreboardModel};