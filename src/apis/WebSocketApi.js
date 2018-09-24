import wsrm from './WebSocketRequestManagement';

async function request({url, message, autoClose, successCallback, failureCallback}) {

    if (!url) {
        return;
    }

    const ws = await wsrm.get(url, ws => {

        ws.onmessage = e => {

            autoClose && wsrm.remove(url);

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

        ws.onclose = () => {
            wsrm.remove(url);
        };

    });

    ws.send(message || '');

}

export default {
    request
};