import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    data: {}
};

function application(state = initialState, action) {
    switch (action.type) {

        // start application
        case actionTypes.START_APPLICATION_REQUEST: {

            const data = state.data;
            data[action.apiParams.applicationId] = actionTypes.START_APPLICATION_REQUEST;

            return {
                ...state,
                data
            };

        }
        case actionTypes.START_APPLICATION_SUCCESS: {

            const data = state.data;
            delete data[action.apiParams.applicationId];

            return {
                ...state,
                data
            };

        }
        case actionTypes.START_APPLICATION_FAILURE: {

            const data = state.data;
            delete data[action.apiParams.applicationId];

            return {
                ...state,
                data
            };

        }

        default:
            return state;

    }
}

export default application;
