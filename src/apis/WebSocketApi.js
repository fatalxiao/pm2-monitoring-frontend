const requestList = {};

function request({url, successCallback, failureCallback}) {

    if (!url) {
        return;
    }

    if (!(url in requestList)) {

        const ws = requestList[url] = new WebSocket(url);

        ws.onmessage = e => {

            try {

                const response = JSON.parse(e.data);

                if (parseInt(+response.code / 1000) === 2) {
                    successCallback && successCallback(response, response.data);
                } else {
                    failureCallback && failureCallback(response, response.data);
                }

            } catch (e) {
                failureCallback && failureCallback(response);
                return;
            }

        };

        ws.onopen = function () {
            ws.send('');
        };

    } else {
        requestList[url].send('');
    }

}

export default {
    request
};