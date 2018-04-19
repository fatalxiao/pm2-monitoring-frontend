import config from 'src/config';
import Api from 'apis/Api';
import RequestManagement from 'apis/RequestManagement';

export default {

    getProcesses(options) {
        Api.get({
            ...options,
            url: `${config.appBaseUrl}/processes`,
            cancelable: false
        });
    }

};