import Api from '../../Api';
import config from '../../../config';

export default {

    createApplication(options) {
        Api.post({
            ...options,
            url: `${config.baseUrl}/application/create`
        });
    },

    updateApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/update/${options.params.applicationName}`,
            params: options.params.form
        });
    },

    uploadApplicationPackage(options) {

        // const reader = new FileReader();
        // reader.readAsArrayBuffer(options.params.file);
        // reader.onload = e => {
        //     WebSocketApi.request({
        //         ...options,
        //         url: `${baseWsUrl}/application/upload/${options.params.processName}`,
        //         message: e.target.result,
        //         autoClose: true
        //     });
        // };

        Api.postForm({
            ...options,
            url: `${config.baseUrl}/application/upload/${options.params.applicationName}`,
            formData: options.params.formData
        });

    },

    startApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/start/${options.params.applicationName}`
        });
    },

    stopApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/stop/${options.params.processId}`
        });
    },

    restartApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/restart/${options.params.processId}`
        });
    },

    deleteApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/delete/${options.params.processId}`
        });
    },

    reloadApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/reload/${options.params.processId}`
        });
    }

};
