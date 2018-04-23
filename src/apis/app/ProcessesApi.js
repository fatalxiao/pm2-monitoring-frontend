import config from 'src/config';
import Api from 'apis/Api';

export default {

    getProcesses(options) {
        Api.get({
            ...options,
            url: `${config.appBaseUrl}/processes`,
            cancelable: false
        });
    }

};