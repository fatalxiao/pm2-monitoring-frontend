import isEmpty from 'lodash/isEmpty';

import * as actionTypes from 'reduxes/actionTypes';

import ApplicationApi from 'reduxes/apis/app/pm/ApplicationApi';
import {getApplications} from '../ApplicationsAction';

export const showCreateApplication = () => dispatch => dispatch({
    type: actionTypes.SHOW_CREATE_APPLICATION
});

export const hideCreateApplication = () => dispatch => {
    setTimeout(() => {
        collpaseCreateApplicationAdvance()(dispatch);
    }, 250);
    dispatch({
        type: actionTypes.HIDE_CREATE_APPLICATION
    });
};

export const collpaseCreateApplicationAdvance = () => dispatch => dispatch({
    type: actionTypes.COLLPASE_CREATE_APPLICATION_ADVANCE
});

export const expandCreateApplicationAdvance = () => dispatch => dispatch({
    type: actionTypes.EXPAND_CREATE_APPLICATION_ADVANCE
});

export const initCreateApplicationForm = () => dispatch => dispatch({
    type: actionTypes.INIT_CREATE_APPLICATION_FORM
});

export const updateCreateApplicationField = (prop, value) => dispatch => dispatch({
    type: actionTypes.UPDATE_CREATE_APPLICATION_FIELD,
    prop,
    value
});

export const validCreateApplicationForm = () => dispatch => dispatch({
    type: actionTypes.VALID_CREATE_APPLICATION_FORM
});

export const createApplication = () => (dispatch, getState) => {

    validCreateApplicationForm()(dispatch);

    const createApplication = getState().createApplication,
        {form, error} = createApplication;

    if (!form || !isEmpty(error)) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.CREATE_APPLICATION_REQUEST,
                actionTypes.CREATE_APPLICATION_SUCCESS,
                actionTypes.CREATE_APPLICATION_FAILURE
            ],
            api: ApplicationApi.createApplication,
            params: form,
            resMsgDisabled: true,
            successCallback() {
                getApplications()(dispatch);
                hideCreateApplication()(dispatch);
            }
        }
    });

};
