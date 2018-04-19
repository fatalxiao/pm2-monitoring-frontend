import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    data: null,
    getActionType: ''
};

function process(state = initialState, action) {
    switch (action.type) {

        // get patient list
        case actionTypes.GET_CURRENT_MONITORING_DATA_REQUEST: {
            return {
                ...state,
                data: null,
                getActionType: actionTypes.GET_CURRENT_MONITORING_DATA_REQUEST
            };
        }
        case actionTypes.GET_CURRENT_MONITORING_DATA_SUCCESS: {
            return {
                ...state,
                data: action.responseData,
                getActionType: actionTypes.GET_CURRENT_MONITORING_DATA_SUCCESS
            };
        }
        case actionTypes.GET_CURRENT_MONITORING_DATA_FAILURE: {
            return {
                ...state,
                data: null,
                getActionType: actionTypes.GET_CURRENT_MONITORING_DATA_FAILURE
            };
        }

        default:
            return state;

    }
}

export default process;