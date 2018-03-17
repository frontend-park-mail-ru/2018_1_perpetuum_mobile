(function () {
    const noop = () => null;

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

        doGetFetch({url = '/', customHeaders = getCors} = {}) {
            const initSettings = {
                method: 'get',
                mode: 'cors',
                credentials: 'include',
                cache: 'default',
                headers: customHeaders
            };
            return fetch(url, initSettings).then(checkAllRight);
        }

        doPostFetch({url = '/', customHeaders = postCors, data = {}} = {}) {
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
		

        doPostDataFetch({url = '/', data = {}} = {}) {
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
    HttpModule.baseUrl = ''; //  for local or heroku starting

    window.HttpModule = HttpModule;
})();
