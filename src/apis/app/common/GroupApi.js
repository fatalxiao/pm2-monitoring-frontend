import config from 'src/config';
import Api from 'apis/Api';

export default {
    getGroups(options) {
        Api.get({
            ...options,
            url: `${config.appBaseUrl}/group/getGroups`,
            cancelable: false
        });
    }
};
