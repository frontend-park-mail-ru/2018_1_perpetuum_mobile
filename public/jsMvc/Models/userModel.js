import {HttpModule} from '../Modules/HttpModule.js';

let baseUrl = '';

switch (window.location.hostname) {
    case 'localhost':
        baseUrl = 'http://localhost:3050';
        // this.baseUrl = '//blendocu-back.herokuapp.com';
        break;
    case '127.0.0.1':
        baseUrl = 'http://127.0.0.1:3050';
        // this.baseUrl = '//blendocu-back.herokuapp.com';
        break;
    case 'blend-front.herokuapp.com':
        baseUrl = '//blend-back.herokuapp.com';
        break;
    case 'blendocu.herokuapp.com':
        baseUrl = '//blendocu-back.herokuapp.com';
        break;
    default:
        baseUrl = '';
}

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