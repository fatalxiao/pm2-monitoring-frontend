import cloneDeep from 'lodash/cloneDeep';

import * as actionTypes from 'reduxes/actionTypes';

const DEFAULT_FORM = {
        name: '',
        desc: '',
        instances: 1,
        script: '',
        port: '',
        env: '',
        envProd: ''
    },
    initialState = {
        form: cloneDeep(DEFAULT_FORM),
        actionType: ''
    };

function createApplication(state = initialState, action) {
    switch (action.type) {

        case actionTypes.INIT_CREATE_APPLICATION_FORM: {
            return {
                ...state,
                form: cloneDeep(DEFAULT_FORM)
            };
        }

        case actionTypes.UPDATE_CREATE_APPLICATION_FIELD: {

            const form = cloneDeep(state.form);
            form[action.prop] = action.value;

            return {
                ...state,
                form
            };

        }

        // create application
        case actionTypes.CREATE_APPLICATION_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.CREATE_APPLICATION_REQUEST
            };
        }
        case actionTypes.CREATE_APPLICATION_SUCCESS: {
            return {
                ...state,
                actionType: actionTypes.CREATE_APPLICATION_SUCCESS
            };
        }
        case actionTypes.CREATE_APPLICATION_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.CREATE_APPLICATION_FAILURE
            };
        }

        default:
            return state;

    }
}

export default createApplication;
