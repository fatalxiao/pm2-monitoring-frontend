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
                url: `ws://localhost:9616/pm/process/upload/${options.params.processName}`,
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

    }

};