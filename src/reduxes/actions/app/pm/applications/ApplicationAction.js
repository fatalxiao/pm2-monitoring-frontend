import * as actionTypes from 'reduxes/actionTypes';
import ProcessApi from 'apis/app/pm/ApplicationApi';
import {runGetApplicationsInterval} from './ApplicationsAction';

export const startApplication = applicationName => dispatch => {

    if (!applicationName) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.START_APPLICATION_REQUEST,
                actionTypes.START_APPLICATION_SUCCESS,
                actionTypes.START_APPLICATION_FAILURE
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

export const stopApplication = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.PAUSE_APPLICATION_REQUEST,
                actionTypes.PAUSE_APPLICATION_SUCCESS,
                actionTypes.PAUSE_APPLICATION_FAILURE
            ],
            api: ProcessApi.stopApplication,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const restartApplication = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.RESTART_APPLICATION_REQUEST,
                actionTypes.RESTART_APPLICATION_SUCCESS,
                actionTypes.RESTART_APPLICATION_FAILURE
            ],
            api: ProcessApi.restartApplication,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const deleteApplication = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.STOP_APPLICATION_REQUEST,
                actionTypes.STOP_APPLICATION_SUCCESS,
                actionTypes.STOP_APPLICATION_FAILURE
            ],
            api: ProcessApi.deleteApplication,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const reloadApplication = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.RELOAD_APPLICATION_REQUEST,
                actionTypes.RELOAD_APPLICATION_SUCCESS,
                actionTypes.RELOAD_APPLICATION_FAILURE
            ],
            api: ProcessApi.reloadApplication,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};
