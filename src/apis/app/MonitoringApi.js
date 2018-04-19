import Api from 'apis/Api';
import RequestManagement from 'apis/RequestManagement';
import config from 'src/config';

export default {

    getCurrentMonitoringData(options) {

        const name = 'monitoring/getCurrentMonitoringData';
        RequestManagement.cancelByName(name);

        Api.get({
            ...options,
            name,
            url: `${config.appBaseUrl}/monitoring`
        });

    }

};