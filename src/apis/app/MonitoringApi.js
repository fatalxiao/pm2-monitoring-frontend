import Api from 'apis/Api';
import RequestManagement from 'apis/RequestManagement';

export default {

    getCurrentMonitoringData(options) {

        const name = 'monitoring/getCurrentMonitoringData';
        RequestManagement.cancelByName(name);

        Api.get({
            ...options,
            name,
            url: `http://localhost:9615`
        });

    }

};