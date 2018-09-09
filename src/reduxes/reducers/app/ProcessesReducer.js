import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    data: null,
    actionType: ''
};

function processes(state = initialState, action) {
    switch (action.type) {

        // get patient list
        case actionTypes.GET_PROCESSES_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.GET_PROCESSES_REQUEST
            };
        }
        case actionTypes.GET_PROCESSES_SUCCESS: {
            return {
                ...state,
                data: action.responseData,
                actionType: actionTypes.GET_PROCESSES_SUCCESS
            };
        }
        case actionTypes.GET_PROCESSES_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.GET_PROCESSES_FAILURE
            };
        }

        default:
            return state;

    }
}

export default processes;