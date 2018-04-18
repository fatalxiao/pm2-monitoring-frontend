import config from 'src/config';
import Api from 'apis/Api';

export default {
    getSensoryBlocks(options) {
        Api.get({
            ...options,
            url: `${config.appBaseUrl}/sensoryBlock/getSensoryBlocks`,
            cancelable: false
        });
    }
};
