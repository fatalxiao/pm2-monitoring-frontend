import cloneDeep from 'lodash/cloneDeep';
import * as actionTypes from 'reduxes/actionTypes';
import Valid from 'vendors/Valid';

const DEFAULT_FORM = {
        name: '',
        description: '',
        instances: 1,
        script: '',
        port: '',
        env: ''
    },
    initialState = {
        activated: false,
        form: cloneDeep(DEFAULT_FORM),
        error: {},
        advanceCollapsed: true,
        actionType: ''
    };

function createApplication(state = initialState, action) {
    switch (action.type) {

        case actionTypes.SHOW_CREATE_APPLICATION: {
            return {
                ...state,
                activated: true
            };
        }
        case actionTypes.HIDE_CREATE_APPLICATION: {
            return {
                ...state,
                activated: false
            };
        }

        case actionTypes.COLLPASE_CREATE_APPLICATION_ADVANCE: {
            return {
                ...state,
                advanceCollapsed: true
            };
        }
        case actionTypes.EXPAND_CREATE_APPLICATION_ADVANCE: {
            return {
                ...state,
                advanceCollapsed: false
            };
        }

        case actionTypes.INIT_CREATE_APPLICATION_FORM: {
            return {
                ...state,
                form: cloneDeep(DEFAULT_FORM),
                error: {}
            };
        }

        case actionTypes.UPDATE_CREATE_APPLICATION_FIELD: {

            const form = cloneDeep(state.form);
            form[action.prop] = action.value;

            return {
                ...state,
                form,
                error: Valid.validApplicationForm(form)
            };

        }

        case actionTypes.VALID_CREATE_APPLICATION_FORM: {
            return {
                ...state,
                error: Valid.validApplicationForm(state.form)
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
                error: {...state.error, ...action.responseData},
                actionType: actionTypes.CREATE_APPLICATION_FAILURE
            };
        }

        default:
            return state;

    }
}

export default createApplication;
