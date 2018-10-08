import Api from '../../Api';
import config from '../../../config';

export default {

    createApplication(options) {
        Api.post({
            ...options,
            url: `${config.baseUrl}/application/create`
        });
    }

};
