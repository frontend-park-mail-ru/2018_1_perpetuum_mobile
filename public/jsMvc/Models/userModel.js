import {HttpModule, baseUrl} from '../Modules/HttpModule.js';


class UserModel {

    constructor() {

    }


    changeImage(data) {

        return HttpModule.doPostDataFetch({url: `${baseUrl}/change_avatar`, data: data})
    }

    changeProfile(data) {

        return HttpModule.doPostFetch({url: `${baseUrl}/settings`, data: data});
    }

    login(data) {

        return HttpModule.doPostFetch({url: `${baseUrl}/login`, data: data});
    }

    register(data) {

        return HttpModule.doPostFetch({url: `${baseUrl}/register`, data: data});
    }

    logout() {

        return HttpModule.doPostFetch({url: `${baseUrl}/logout`});
    }

    loadMe() {

        return HttpModule.doGetFetch({url: `${baseUrl}/me`});
    }
}

export {UserModel};