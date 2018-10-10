import * as actionTypes from 'reduxes/actionTypes';
import ApplicationsApi from 'apis/app/pm/ApplicationsApi';
import config from 'src/config';

let process = config.refreshInterval,
    getApplicationsIntervalId = null;

function init(dispatch) {

    if (getApplicationsIntervalId) {
        clearTimeout(getApplicationsIntervalId);
    }

    process = config.refreshInterval;
    updateRequestApplicationsProgress(process)(dispatch);

}

export const getApplications = () => dispatch => {

    init(dispatch);

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_APPLICATIONS_REQUEST,
                actionTypes.GET_APPLICATIONS_SUCCESS,
                actionTypes.GET_APPLICATIONS_FAILURE
            ],
            api: ApplicationsApi.getApplications,
            isWebSocket: true,
            resMsgDisabled: true,
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const updateRequestApplicationsProgress = progress => dispatch => dispatch({
    type: actionTypes.UPDATE_REQUEST_APPLICATIONS_PROGRESS,
    progress
});

export const runGetApplicationsInterval = (interval = config.refreshInterval * 1000) => dispatch => {

    if (process <= 0) {
        getApplications()(dispatch);
    } else {

        process--;
        updateRequestApplicationsProgress(process)(dispatch);

        getApplicationsIntervalId = setTimeout(() => {
            runGetApplicationsInterval(interval)(dispatch);
        }, 1000);

    }

};
