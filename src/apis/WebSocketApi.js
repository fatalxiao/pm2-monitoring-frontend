const requestList = {};

function request({url, successCallback, failureCallback}) {

    if (!url) {
        return;
    }

    if (!(url in requestList)) {

        const ws = requestList[url] = new WebSocket(url);

        ws.onmessage = e => {
            console.log(e.data);
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