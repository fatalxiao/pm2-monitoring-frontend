import cloneDeep from 'lodash/cloneDeep';

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    actionType: {}
};

function application(state = initialState, action) {

    if (action.type === actionTypes.UPDATE_APPLICATION_REQUEST
        || action.type === actionTypes.UPLOAD_APPLICATION_PACKAGE_REQUEST
        || action.type === actionTypes.START_APPLICATION_REQUEST
        || action.type === actionTypes.PAUSE_APPLICATION_REQUEST
        || action.type === actionTypes.RESTART_APPLICATION_REQUEST
        || action.type === actionTypes.STOP_APPLICATION_REQUEST
        || action.type === actionTypes.RELOAD_APPLICATION_REQUEST
        || action.type === actionTypes.RENAME_APPLICATION_REQUEST) {
        const actionType = cloneDeep(state.actionType);
        actionType[action.apiParams.applicationName] = action.type;
        return {
            ...state,
            actionType
        };
    } else if (action.type === actionTypes.UPDATE_APPLICATION_SUCCESS
        || action.type === actionTypes.UPLOAD_APPLICATION_PACKAGE_SUCCESS
        || action.type === actionTypes.START_APPLICATION_SUCCESS
        || action.type === actionTypes.PAUSE_APPLICATION_SUCCESS
        || action.type === actionTypes.RESTART_APPLICATION_SUCCESS
        || action.type === actionTypes.STOP_APPLICATION_SUCCESS
        || action.type === actionTypes.RELOAD_APPLICATION_SUCCESS
        || action.type === actionTypes.RENAME_APPLICATION_SUCCESS
        || action.type === actionTypes.UPDATE_APPLICATION_FAILURE
        || action.type === actionTypes.UPLOAD_APPLICATION_PACKAGE_FAILURE
        || action.type === actionTypes.START_APPLICATION_FAILURE
        || action.type === actionTypes.PAUSE_APPLICATION_FAILURE
        || action.type === actionTypes.RESTART_APPLICATION_FAILURE
        || action.type === actionTypes.STOP_APPLICATION_FAILURE
        || action.type === actionTypes.RELOAD_APPLICATION_FAILURE
        || action.type === actionTypes.RENAME_APPLICATION_FAILURE) {
        const actionType = cloneDeep(state.actionType);
        delete actionType[action.apiParams.applicationName];
        return {
            ...state,
            actionType
        };
    }

    return state;

}

export default application;
