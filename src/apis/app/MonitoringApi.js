import Api from 'apis/Api';
import RequestManagement from 'apis/RequestManagement';

export default {

    getCurrentMonitoringData() {

        const name = 'monitoring/getCurrentMonitoringData';
        RequestManagement.cancelByName(name);

        if (options.params) {
            Api.get({
                ...options,
                name,
                url: `http://localhost:9615`
            });
        }

    }

};