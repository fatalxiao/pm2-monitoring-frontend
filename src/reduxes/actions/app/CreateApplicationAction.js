import * as actionTypes from 'reduxes/actionTypes';
import CreateApplicationApi from 'apis/app/pm/CreateApplicationApi';

export const initCreateApplicationForm = () => dispatch => dispatch({
    type: actionTypes.INIT_CREATE_APPLICATION_FORM
});

export const updateCreateApplicationField = (prop, value) => dispatch => dispatch({
    type: actionTypes.UPDATE_CREATE_APPLICATION_FIELD,
    prop,
    value
});

export const createApplication = callback => (dispatch, getState) => {

    const form = getState().createApplication.form;

    if (!form || !form.name) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.CREATE_APPLICATION_REQUEST,
                actionTypes.CREATE_APPLICATION_SUCCESS,
                actionTypes.CREATE_APPLICATION_FAILURE
            ],
            api: CreateApplicationApi.createApplication,
            params: form,
            successResMsgDisabled: true,
            successCallback(responseData) {
                callback && callback(responseData);
            }
        }
    });

};
