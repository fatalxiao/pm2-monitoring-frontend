import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    actionType: ''
};

function process(state = initialState, action) {
    switch (action.type) {

        // upload process package
        case actionTypes.UPLOAD_PROCESS_PACKAGE_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.UPLOAD_PROCESS_PACKAGE_REQUEST
            };
        }
        case actionTypes.UPLOAD_PROCESS_PACKAGE_SUCCESS: {
            return {
                ...state,
                actionType: actionTypes.UPLOAD_PROCESS_PACKAGE_SUCCESS
            };
        }
        case actionTypes.UPLOAD_PROCESS_PACKAGE_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.UPLOAD_PROCESS_PACKAGE_FAILURE
            };
        }

        default:
            return state;

    }
}

export default process;