import {HttpModule} from '../Modules/HttpModule';


class UserModel {

    constructor() {

    }


    changeImage(data) {

        return HttpModule.doPostDataFetch({url: `${httpModule.baseUrl}/change_avatar`, data: data})
    }

    changeProfile(data) {

        return HttpModule.doPostFetch({url: `${httpModule.baseUrl}/settings`, data: data});
    }

    login(data) {

        return HttpModule.doPostFetch({url: `${httpModule.baseUrl}/login`, data: data});
    }

    register(data) {

        return HttpModule.doPostFetch({url: `${httpModule.baseUrl}/register`, data: data});
    }

    logout() {

        return HttpModule.doPostFetch({url: `${httpModule.baseUrl}/logout`});
    }

    loadMe() {

        return HttpModule.doGetFetch({url: `${httpModule.baseUrl}/me`});
    }
}

export {UserModel};