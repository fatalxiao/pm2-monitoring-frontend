import config from 'src/config';
import WebSocketApi from 'reduxes/apis/WebSocketApi';

export default {

    getApplications(options) {
        WebSocketApi.request({
            ...options,
            url: `${config.baseUrl}/applications`
        });
    }

};
