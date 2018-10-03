import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    actionType: {}
};

function application(state = initialState, action) {

    if (action.type === actionTypes.START_APPLICATION_REQUEST
        || action.type === actionTypes.PAUSE_APPLICATION_REQUEST
        || action.type === actionTypes.RESTART_APPLICATION_REQUEST
        || action.type === actionTypes.STOP_APPLICATION_REQUEST
        || action.type === actionTypes.RELOAD_APPLICATION_REQUEST) {
        const actionType = state.actionType;
        actionType[action.apiParams.applicationId] = action.type;
        return {
            ...state,
            actionType
        };
    } else if (action.type === actionTypes.START_APPLICATION_SUCCESS
        || action.type === actionTypes.PAUSE_APPLICATION_SUCCESS
        || action.type === actionTypes.RESTART_APPLICATION_SUCCESS
        || action.type === actionTypes.STOP_APPLICATION_SUCCESS
        || action.type === actionTypes.RELOAD_APPLICATION_SUCCESS
        || action.type === actionTypes.START_APPLICATION_FAILURE
        || action.type === actionTypes.PAUSE_APPLICATION_FAILURE
        || action.type === actionTypes.RESTART_APPLICATION_FAILURE
        || action.type === actionTypes.STOP_APPLICATION_FAILURE
        || action.type === actionTypes.RELOAD_APPLICATION_FAILURE) {
        const actionType = state.actionType;
        delete actionType[action.apiParams.applicationId];
        return {
            ...state,
            actionType
        };
    }

    return state;

}

export default application;
