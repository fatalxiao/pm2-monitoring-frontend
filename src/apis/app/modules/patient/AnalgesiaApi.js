import config from 'src/config';
import Api from 'apis/Api';

export default {

    getAnalgesiaDataByPatientId(options) {
        Api.get({
            ...options,
            url: `${config.appBaseUrl}/analgesia/getAnalgesiaDataByPatientId/${options.params.patientId}`
        });
    },

    createOrUpdateAnalgesiaData(options) {
        Api.post({
            ...options,
            url: `${config.appBaseUrl}/analgesia/createOrUpdateAnalgesiaData/${options.params.patientId}`,
            params: options.params.analgesiaData,
            cancelable: false
        });
    }

};
