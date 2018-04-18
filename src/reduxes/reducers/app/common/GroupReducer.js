import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    list: []
};

function group(state = initialState, action) {
    switch (action.type) {

        // get group list
        case actionTypes.GET_GROUPS_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.GET_GROUPS_REQUEST
            };
        }

        case actionTypes.GET_GROUPS_SUCCESS: {
            return {
                ...state,
                list: action.responseData,
                actionType: actionTypes.GET_GROUPS_SUCCESS
            };
        }

        case actionTypes.GET_GROUPS_FAILURE: {
            return {
                ...state,
                list: [],
                actionType: actionTypes.GET_GROUPS_FAILURE
            };
        }

        default:
            return state;

    }
}

export default group;