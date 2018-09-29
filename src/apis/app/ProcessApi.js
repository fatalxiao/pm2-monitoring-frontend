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
                url: `${baseWsUrl}/process/upload/${options.params.processName}`,
                message: e.target.result,
                autoClose: true
            });
        };

        // Api.postForm({
        //     ...options,
        //     url: `${config.appBaseUrl}/process/upload/${options.params.processName}`,
        //     formData: options.params.formData,
        //     cancelable: false
        // });

    },

    startProcess(options) {
        Api.put({
            ...options,
            name,
            url: `${config.baseUrl}/process/start/${options.params.processName}`
        });
    },

    pauseProcess(options) {
        Api.put({
            ...options,
            name,
            url: `${config.baseUrl}/process/pause/${options.params.processId}`
        });
    },

    restartProcess(options) {
        Api.put({
            ...options,
            name,
            url: `${config.baseUrl}/process/restart/${options.params.processId}`
        });
    },

    stopProcess(options) {
        Api.put({
            ...options,
            name,
            url: `${config.baseUrl}/pm/process/stop/${options.params.processId}`
        });
    },

    reloadProcess(options) {
        Api.put({
            ...options,
            name,
            url: `${config.baseUrl}/process/reload/${options.params.processId}`
        });
    }

};
