/** @module modules/http */

let baseUrl = '';

/** switches the backend url */
switch (window.location.hostname) {
    case 'localhost':
        baseUrl = '//localhost:3050';
        // this.baseUrl = '//blendocu-back.herokuapp.com';
        break;
    case '127.0.0.1':
        baseUrl = '//127.0.0.1:3050';
        // this.baseUrl = '//blendocu-back.herokuapp.com';
        break;
    case 'blend-front.herokuapp.com':
        baseUrl = '//blend-back.herokuapp.com';
        break;
    case 'blendocu.herokuapp.com':
        baseUrl = '//blendocu-back.herokuapp.com';
        break;
    case 'blendocu.com':
        baseUrl = '//back.blendocu.com';
        break;
    case 'blendocu.me':
        baseUrl = '//back.blendocu.me';
        break;
    default:
        baseUrl = '';
}


/** Headers for Get requests from backend */
const getCors = new Headers({
});

/** Headers for Post requests from backend */
const postCors = {
    'Content-Type': 'application/json'
};


/** @func checkAllRight - The function checks whether server response code is less than 300 and message body is json
 * @param response - The direct response from server
 * @returns {Promise.<Object|Error>} The object from server response
 * or Error with message from server
 * or Error with hardcoded message 'Connection problems'*/
function checkAllRight(response) {
    if (response.ok) {
        return response.json();
    }
    return response.json().catch((err) => {
        console.warn(err);
        throw new Error('Connection problems');
    }).then(throwErr);
}


/** @func throwErr - The function throws error with the message.
 * @param {object} err - The Object contains message in it.
 * @return {Error} - Throws error with body as err.message. */
function throwErr(err) {
    throw new Error(err.message);
}


/** Class serving connection and requests to backend. */
class HttpModule {

    /** Get data from backend in JSON.
     * Uses GET.
     * @static
     * @param {Object<string, Object>} The first parameter - url to go, by default '/'
     * The second parameter is an object with headers to apply to the request
     * body in fetch format {@link https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch}.
     * @return {Promise.<Object|Error>} The Promise with parsed JSON object
     * or Error checked by {@link checkAllRight}. */
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

    /** Post data to backend in JSON and get response data from backend in JSON.
     * Uses POST.
     * @static
     * @param {Object<string, Object, Object>} The first parameter - url to go, by default '/'
     * The second parameter is an object with headers to apply to the request body in
     * fetch format {@link https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch}.
     * The third parameter is an object contains all data to JSON.stringify and then send to server.
     * @return {Promise.<Object|Error>} The Promise with parsed JSON object
     * or Error checked by {@link checkAllRight}. */
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

    /** Post data to backend in JSON and get response data from backend in JSON.
     * Uses POST.
     * @static
     * @param {Object<string, Object, Object>} The first parameter - url to go, by default '/'
     * The second parameter is an object with headers to apply to the request body in
     * fetch format {@link https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch}.
     * The third parameter is an object contains all data to send to server (BLOB).
     * @return {Promise.<Object|Error>} The Promise with parsed JSON object
     * or Error checked by {@link checkAllRight}. */
    static doPostDataFetch({url = '/', data = {}} = {}) {
        const initSettings = {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            cache: 'default',
            body: data
        };

        return fetch(url, initSettings).then(checkAllRight);
    }

}

export {HttpModule, baseUrl};