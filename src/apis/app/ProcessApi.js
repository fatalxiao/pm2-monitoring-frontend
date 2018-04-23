import WebSocketApi from '../WebSocketApi';

export default {

    uploadProcessPackage(options) {
        WebSocketApi.request({
            ...options,
            url: `ws://localhost:9616/pm/process/upload/${options.params.processName}`,
            message: new FormData(options.params.formData)
        });
    }

};