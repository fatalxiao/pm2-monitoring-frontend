import wsrm from './WebSocketRequestManagement';

async function request({url, successCallback, failureCallback}) {

    if (!url) {
        return;
    }

    const ws = await wsrm.get(url, ws => {

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

        ws.onerror = () => {
            close(url);
        };

        ws.onclose = () => {
            close(url);
        };

    });

    ws.send('');

}

export default {
    request
};