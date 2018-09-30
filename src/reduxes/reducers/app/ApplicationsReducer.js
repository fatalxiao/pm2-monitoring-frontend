import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    init: true,
    data: null,
    actionType: ''
};

function applications(state = initialState, action) {
    switch (action.type) {

        // get patient list
        case actionTypes.GET_APPLICATIONS_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.GET_APPLICATIONS_REQUEST
            };
        }
        case actionTypes.GET_APPLICATIONS_SUCCESS: {
            return {
                ...state,
                init: false,
                data: action.responseData,
                actionType: actionTypes.GET_APPLICATIONS_SUCCESS
            };
        }
        case actionTypes.GET_APPLICATIONS_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.GET_APPLICATIONS_FAILURE
            };
        }

        default:
            return state;

    }
}

export default applications;
