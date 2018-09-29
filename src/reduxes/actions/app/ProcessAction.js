import * as actionTypes from 'reduxes/actionTypes';
import ProcessApi from 'apis/app/ProcessApi';

export const startProcess = processName => dispatch => {

    if (!processName) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.START_PROCESS_REQUEST,
                actionTypes.START_PROCESS_SUCCESS,
                actionTypes.START_PROCESS_FAILURE
            ],
            api: ProcessApi.startProcess,
            params: {
                processName
            }
        }
    });

};

export const pauseProcess = processId => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.PAUSE_PROCESS_REQUEST,
                actionTypes.PAUSE_PROCESS_SUCCESS,
                actionTypes.PAUSE_PROCESS_FAILURE
            ],
            api: ProcessApi.pauseProcess,
            params: {
                processId
            }
        }
    });

};

export const restartProcess = processId => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.RESTART_PROCESS_REQUEST,
                actionTypes.RESTART_PROCESS_SUCCESS,
                actionTypes.RESTART_PROCESS_FAILURE
            ],
            api: ProcessApi.restartProcess,
            params: {
                processId
            }
        }
    });

};

export const stopProcess = processId => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.STOP_PROCESS_REQUEST,
                actionTypes.STOP_PROCESS_SUCCESS,
                actionTypes.STOP_PROCESS_FAILURE
            ],
            api: ProcessApi.stopProcess,
            params: {
                processId
            }
        }
    });

};

export const reloadProcess = processId => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.RELOAD_PROCESS_REQUEST,
                actionTypes.RELOAD_PROCESS_SUCCESS,
                actionTypes.RELOAD_PROCESS_FAILURE
            ],
            api: ProcessApi.reloadProcess,
            params: {
                processId
            }
        }
    });

};
