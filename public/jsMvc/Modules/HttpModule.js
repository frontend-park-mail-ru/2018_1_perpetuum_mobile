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

export {HttpModule};