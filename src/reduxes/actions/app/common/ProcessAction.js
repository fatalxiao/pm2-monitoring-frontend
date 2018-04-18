import * as actionTypes from 'reduxes/actionTypes';
import ProcessApi from 'apis/app/common/ProcessApi';

export const getProcesses = () => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_PROCESSES_REQUEST,
                actionTypes.GET_PROCESSES_SUCCESS,
                actionTypes.GET_PROCESSES_FAILURE
            ],
            api: ProcessApi.getProcesses,
            successResMsgDisabled: true
        }
    });
};