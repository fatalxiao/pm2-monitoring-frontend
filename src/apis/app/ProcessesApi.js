import config from 'src/config';
import WebSocketApi from 'apis/WebSocketApi';

export default {

    getProcesses(options) {
        WebSocketApi.request({
            ...options,
            url: `${config.baseWsUrl}/processes`
        });
    }

};