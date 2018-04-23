import WebSocketApi from '../WebSocketApi';

export default {

    uploadProcessPackage(options) {

        const reader = new FileReader();
        reader.readAsArrayBuffer(options.params.file);
        reader.onload = e => {
            WebSocketApi.request({
                ...options,
                url: `ws://localhost:9616/pm/process/upload/${options.params.processName}`,
                message: e.target.result
            });
        };

    }

};