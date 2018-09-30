import Api from '../Api';
import WebSocketApi from '../WebSocketApi';
import config from '../../config';

export default {

    uploadProcessPackage(options) {

        const reader = new FileReader();
        reader.readAsArrayBuffer(options.params.file);
        reader.onload = e => {
            WebSocketApi.request({
                ...options,
                url: `${baseWsUrl}/application/upload/${options.params.processName}`,
                message: e.target.result,
                autoClose: true
            });
        };

        // Api.postForm({
        //     ...options,
        //     url: `${config.appBaseUrl}/application/upload/${options.params.processName}`,
        //     formData: options.params.formData,
        //     cancelable: false
        // });

    },

    startApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/start/${options.params.applicationName}`
        });
    },

    pauseApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/pause/${options.params.processId}`
        });
    },

    restartApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/restart/${options.params.processId}`
        });
    },

    stopApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/stop/${options.params.processId}`
        });
    },

    reloadApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/reload/${options.params.processId}`
        });
    }

};
