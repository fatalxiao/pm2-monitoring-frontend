import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    list: [],
    getActionType: ''
};

function process(state = initialState, action) {
    switch (action.type) {

        // get patient list
        case actionTypes.GET_PROCESSES_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.GET_PROCESSES_REQUEST
            };
        }
        case actionTypes.GET_PROCESSES_SUCCESS: {
            return {
                ...state,
                list: action.responseData,
                getActionType: actionTypes.GET_PROCESSES_SUCCESS
            };
        }
        case actionTypes.GET_PROCESSES_FAILURE: {
            return {
                ...state,
                list: [],
                getActionType: actionTypes.GET_PROCESSES_FAILURE
            };
        }

        default:
            return state;

    }
}

export default process;