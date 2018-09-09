import * as actionTypes from 'reduxes/actionTypes';
import ProcessesApi from 'apis/app/ProcessesApi';

export const getProcesses = () => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_CURRENT_MONITORING_DATA_REQUEST,
                actionTypes.GET_CURRENT_MONITORING_DATA_SUCCESS,
                actionTypes.GET_CURRENT_MONITORING_DATA_FAILURE
            ],
            api: ProcessesApi.getProcesses,
            isWebSocket: true,
            resMsgDisabled: true
        }
    });
};