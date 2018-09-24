import * as actionTypes from 'reduxes/actionTypes';
import ProcessesApi from 'apis/app/ProcessesApi';

export const getProcesses = () => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_PROCESSES_REQUEST,
                actionTypes.GET_PROCESSES_SUCCESS,
                actionTypes.GET_PROCESSES_FAILURE
            ],
            api: ProcessesApi.getProcesses,
            isWebSocket: true,
            resMsgDisabled: true
        }
    });
};