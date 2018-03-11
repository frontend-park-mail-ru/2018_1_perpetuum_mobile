(function () {
	const noop = () => null;

	const getCors = new Headers({
    });

	const postCors = {
        "Content-Type": "application/json"
    };

	function checkAllRight(response){
	    if(response.ok){
	        return response.json();
        }
        throw new Error('>= 300');
    }

	class HttpModule {

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

        doPostFetch({url = '/', customHeaders = postCors, data = {}} = {}){
            const initSettings = {
                method: 'post',
                mode: 'cors',
                credentials: 'include',
                cache: 'default',
                headers: customHeaders,
                body: JSON.stringify(data)
            };

            console.log(data);
            return fetch(url, initSettings).then(checkAllRight);
		}
		

        doPostDataFetch({url = '/', data = {}} = {}){
            const initSettings = {
                method: 'post',
                mode: 'cors',
                credentials: 'include',
                cache: 'default',
                body: data
            };

            console.log(data);
            return fetch(url, initSettings);
        }


        //deprecated, now unused

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
	HttpModule.baseUrl = ''; //  for local or heroku starting

	window.HttpModule = HttpModule;
})();
