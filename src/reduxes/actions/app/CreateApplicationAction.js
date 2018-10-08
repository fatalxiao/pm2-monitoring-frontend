import * as actionTypes from 'reduxes/actionTypes';
import ProcessApi from 'apis/app/pm/ApplicationApi';
import {runGetApplicationsInterval} from './ApplicationsAction';

export const initCreateApplicationForm = () => dispatch => dispatch({
    type: actionTypes.INIT_CREATE_APPLICATION_FORM
});

export const updateCreateApplicationField = (prop, value) => dispatch => dispatch({
    type: actionTypes.UPDATE_CREATE_APPLICATION_FIELD,
    prop,
    value
});

export const createApplication = applicationName => dispatch => {

    if (!applicationName) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.CREATE_APPLICATION_REQUEST,
                actionTypes.CREATE_APPLICATION_SUCCESS,
                actionTypes.CREATE_APPLICATION_FAILURE
            ],
            api: ProcessApi.startApplication,
            params: {
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};
