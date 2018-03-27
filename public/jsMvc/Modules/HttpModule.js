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

const getCors = new Headers({
});

const postCors = {
    'Content-Type': 'application/json'
};

function checkAllRight(response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error('>= 300');
}

class HttpModule {

    constructor() {

    }

    static doGetFetch({url = '/', customHeaders = getCors} = {}) {
        const initSettings = {
            method: 'get',
            mode: 'cors',
            credentials: 'include',
            cache: 'default',
            headers: customHeaders
        };
        return fetch(url, initSettings).then(checkAllRight);
    }

    static doPostFetch({url = '/', customHeaders = postCors, data = {}} = {}) {
        const initSettings = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            cache: 'default',
            headers: customHeaders,
            body: JSON.stringify(data)
        };

        return fetch(url, initSettings).then(checkAllRight);
    }


    static doPostDataFetch({url = '/', data = {}} = {}) {
        const initSettings = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            cache: 'default',
            body: data
        };

        console.log(data);
        return fetch(url, initSettings).then(checkAllRight);
    }

}

export {HttpModule, baseUrl};