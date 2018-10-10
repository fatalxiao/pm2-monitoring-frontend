import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    init: true,
    data: null,
    progress: 0,
    actionType: ''
};

function applications(state = initialState, action) {
    switch (action.type) {

        // get application list
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

        case actionTypes.UPDATE_REQUEST_APPLICATIONS_PROGRESS: {
            return {
                ...state,
                progress: action.progress
            };
        }

        default:
            return state;

    }
}

export default applications;
