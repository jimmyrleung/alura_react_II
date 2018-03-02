const Request = {
    send: function (url, method, authenticated, data) {
        return new Promise((resolve, reject) => {
            let requestInfo = {
                method: method,
                headers: new Headers({
                    "Content-type": "application/json",
                }),
            };

            if (authenticated) requestInfo.headers.append("Authorization", localStorage.getItem("auth-token"));
            if (data) requestInfo.body = JSON.stringify(data);

            fetch(url, requestInfo)
                .then(response => {
                    return response.body ? Promise.all([response.ok, response.status, response.json()]) : Promise.all([response.ok, response.status, null]);
                })
                // Usamos destructuring ao invés de .spread pois o .spread não é um recurso nativo das promises
                .then(([isResponseOk, responseStatus, responseBody]) => {
                    if (isResponseOk) {
                        resolve(responseBody || null);
                    }
                    else {
                        reject(`Request to ${url} failed with status ${responseStatus}`);
                    }
                })
                .catch(err => reject(err));
        });
    }
};

export default Request;