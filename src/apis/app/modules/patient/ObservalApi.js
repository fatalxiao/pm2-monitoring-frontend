import config from 'src/config';
import Api from 'apis/Api';

export default {

    getObservalDataByPatientId(options) {
        Api.get({
            ...options,
            url: `${config.appBaseUrl}/observal/getObservalDataByPatientId/${options.params.patientId}`
        });
    },

    createOrUpdateObservalData(options) {
        Api.post({
            ...options,
            url: `${config.appBaseUrl}/observal/createOrUpdateObservalData/${options.params.patientId}`,
            params: options.params.observalData,
            cancelable: false
        });
    }

};
