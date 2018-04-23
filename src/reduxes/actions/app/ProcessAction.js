import * as actionTypes from 'reduxes/actionTypes';
import ProcessApi from 'apis/app/ProcessApi';

export const uploadProcessPackage = (processName, file) => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.UPLOAD_PROCESS_PACKAGE_REQUEST,
                actionTypes.UPLOAD_PROCESS_PACKAGE_SUCCESS,
                actionTypes.UPLOAD_PROCESS_PACKAGE_FAILURE
            ],
            api: ProcessApi.uploadProcessPackage,
            params: {
                processName,
                file
            },
            isWebSocket: true,
            successResMsgDisabled: true
        }
    });
};