(function () {
	const noop = () => null;

	const getCors = new Headers({
        "Origin": "http://127.0.0.1:3000"
    });

	const postCors = {

    };

	function checkAllRight(response){
	    if(response.ok){
	        return response;
        }
        throw new Error('Network problems');
    }

	class HttpModule {

		doGet({url = '/', callback = noop} = {}) {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);

			xhr.onreadystatechange = function () {
				if (xhr.readyState != 4) {
					return;
				}

				if (xhr.status < 300) {
					const responseText = xhr.responseText;
					try {
						const response = JSON.parse(responseText);
						callback(null, response);
					} catch (err) {
						console.error('doGet error: ', err);
						callback(err);
					}
				} else {
					callback(xhr);
				}
			};

			xhr.withCredentials = true;

			xhr.send();
		}

		doGetFetch({url = '/', customHeaders = getCors} = {}){
		    const initSettings = {
		        method: 'get',
                mode: 'cors',
                credentials: 'include',
                cache: 'default',
                headers: customHeaders
            };
            return fetch(url, initSettings).then(checkAllRight);
        }

        doPostFetch({url = '/', settings = postCors, data = {}} = {}){
		    return fetch(url, settings);
        }

		doPost({url = '/', callback = noop, data = {}} = {}) {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);

			xhr.onreadystatechange = function () {
				if (xhr.readyState != 4) {
					return;
				}

				if (xhr.status < 300) {
					const responseText = xhr.responseText;

					try {
						const response = JSON.parse(responseText);
						callback(null, response);
					} catch (err) {
						console.error('doPost error: ', err);
						callback(err);
					}
				} else {
					callback(xhr);
				}
			};

			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			xhr.withCredentials = true;

			xhr.send(JSON.stringify(data));
		}
	}

	window.HttpModule = HttpModule;
})();
