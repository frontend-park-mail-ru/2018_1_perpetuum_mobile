import {HttpModule, baseUrl} from '../Modules/HttpModule.js';

class ScoreboardModel {
    loadAllUsers(data) {
        return HttpModule.doPostFetch({url: `${baseUrl}/users`, data: data});
    }
}

export {ScoreboardModel};