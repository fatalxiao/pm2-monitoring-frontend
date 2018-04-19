import * as actionTypes from 'reduxes/actionTypes';
import MonitoringApi from 'apis/app/MonitoringApi';

export const getCurrentMonitoringData = () => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_CURRENT_MONITORING_DATA_REQUEST,
                actionTypes.GET_CURRENT_MONITORING_DATA_SUCCESS,
                actionTypes.GET_CURRENT_MONITORING_DATA_FAILURE
            ],
            api: MonitoringApi.getCurrentMonitoringData,
            resMsgDisabled: true
        }
    });
};