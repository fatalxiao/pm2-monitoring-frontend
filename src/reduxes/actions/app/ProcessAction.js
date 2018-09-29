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
