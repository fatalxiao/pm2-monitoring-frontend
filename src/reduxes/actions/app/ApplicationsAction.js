import * as actionTypes from 'reduxes/actionTypes';
import ApplicationsApi from 'apis/app/ApplicationsApi';

export const getApplications = () => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_APPLICATIONS_REQUEST,
                actionTypes.GET_APPLICATIONS_SUCCESS,
                actionTypes.GET_APPLICATIONS_FAILURE
            ],
            api: ApplicationsApi.getApplications,
            isWebSocket: true,
            resMsgDisabled: true
        }
    });
};

let getApplicationsIntervalId = null;
export const runGetApplicationsInterval = (interval = 5000) => dispatch => {

    if (getApplicationsIntervalId) {
        clearTimeout(getApplicationsIntervalId);
    }

    getApplications()(dispatch);

    getApplicationsIntervalId = setTimeout(() => {
        runGetApplicationsInterval(interval)(dispatch);
    }, interval);

};
