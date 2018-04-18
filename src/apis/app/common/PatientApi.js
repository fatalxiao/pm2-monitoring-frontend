import config from 'src/config';
import Api from 'apis/Api';
import RequestManagement from 'apis/RequestManagement';

export default {

    getPatients(options) {
        Api.get({
            ...options,
            url: `${config.appBaseUrl}/patient/getPatients`,
            cancelable: false
        });
    },

    getFullPatients(options) {
        Api.get({
            ...options,
            url: `${config.appBaseUrl}/patient/getFullPatients`,
            cancelable: false
        });
    },

    updatePatientName(options) {

        const name = `updatePatientName/${options.id}`;
        RequestManagement.cancelByName(name);

        Api.post({
            ...options,
            name,
            url: `${config.appBaseUrl}/patient/updatePatient`
        });

    },

    updatePatientGroup(options) {
        Api.post({
            ...options,
            url: `${config.appBaseUrl}/patient/updatePatient`,
            cancelable: false
        });
    },

    enablePatient(options) {
        Api.post({
            ...options,
            url: `${config.appBaseUrl}/patient/enable/${options.params.id}`,
            cancelable: false
        });
    },

    disablePatient(options) {
        Api.post({
            ...options,
            url: `${config.appBaseUrl}/patient/disable/${options.params.id}`,
            cancelable: false
        });
    }

};