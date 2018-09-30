import * as actionTypes from 'reduxes/actionTypes';
import ProcessApi from 'apis/app/ApplicationApi';
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
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const pauseApplication = processId => dispatch => {

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
            api: ProcessApi.pauseApplication,
            params: {
                processId
            },
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const restartApplication = processId => dispatch => {

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
                processId
            },
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const stopApplication = processId => dispatch => {

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
            api: ProcessApi.stopApplication,
            params: {
                processId
            },
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const reloadApplication = processId => dispatch => {

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
                processId
            },
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};
