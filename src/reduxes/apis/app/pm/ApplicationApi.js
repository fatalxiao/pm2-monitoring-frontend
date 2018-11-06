import Api from '../../Api';
import config from '../../../../config';
import RequestManagement from 'reduxes/apis/RequestManagement';

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
        Api.postForm({
            ...options,
            url: `${config.baseUrl}/application/upload/${options.params.applicationName}`,
            formData: options.params.formData
        });
    },

    startApplicationProcess(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/process/start/${options.params.applicationName}`
        });
    },

    stopApplicationProcess(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/process/stop/${options.params.processId}`
        });
    },

    restartApplicationProcess(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/process/restart/${options.params.processId}`
        });
    },

    deleteApplicationProcess(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/process/delete/${options.params.processId}`
        });
    },

    reloadApplicationProcess(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/process/reload/${options.params.processId}`
        });
    },

    checkApplicationNameExist(options) {

        const name = 'application/checkApplicationNameExist';
        RequestManagement.cancelByName(name);

        Api.get({
            ...options,
            name,
            url: `${config.baseUrl}/application/exist/${options.params.applicationName}`
        });

    },

    renameApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/rename/${options.params.applicationName}`
        });
    },

    deleteApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/rename/${options.params.applicationName}`
        });
    }

};
