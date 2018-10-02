import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    data: {}
};

function application(state = initialState, action) {

    // switch (action.type) {
    //
    //     // start application
    //     case actionTypes.START_APPLICATION_REQUEST: {
    //
    //         const data = state.data;
    //         data[action.apiParams.applicationId] = actionTypes.START_APPLICATION_REQUEST;
    //
    //         return {
    //             ...state,
    //             data
    //         };
    //
    //     }
    //     case actionTypes.START_APPLICATION_SUCCESS: {
    //
    //         const data = state.data;
    //         delete data[action.apiParams.applicationId];
    //
    //         return {
    //             ...state,
    //             data
    //         };
    //
    //     }
    //     case actionTypes.START_APPLICATION_FAILURE: {
    //
    //         const data = state.data;
    //         delete data[action.apiParams.applicationId];
    //
    //         return {
    //             ...state,
    //             data
    //         };
    //
    //     }
    //
    //     default:
    //         return state;
    //
    // }

    if (action.type === actionTypes.START_APPLICATION_REQUEST
        || action.type === actionTypes.PAUSE_APPLICATION_REQUEST
        || action.type === actionTypes.RESTART_APPLICATION_REQUEST
        || action.type === actionTypes.STOP_APPLICATION_REQUEST
        || action.type === actionTypes.RELOAD_APPLICATION_REQUEST) {
        const data = state.data;
        data[action.apiParams.applicationId] = action.type;
        return {
            ...state,
            data
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
        const data = state.data;
        delete data[action.apiParams.applicationId];
        return {
            ...state,
            data
        };
    }

    return state;

}

export default application;
