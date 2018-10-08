import Api from '../../Api';
import config from '../../../config';

export default {

    createApplication(options) {
        Api.put({
            ...options,
            url: `${config.baseUrl}/application/create`
        });
    }

};
