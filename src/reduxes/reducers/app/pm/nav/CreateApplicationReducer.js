import cloneDeep from 'lodash/cloneDeep';

import * as actionTypes from 'reduxes/actionTypes';

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
        actionType: ''
    };

function validField(prop, value) {
    switch (prop) {
        case 'name':
            if (!value) {
                return 'Application Name is required';
            }
            return;
        case 'instances':
            if (value !== '' && value !== 'max' && isNaN(value)) {
                return 'Instances must be a number or "max"';
            }
            return;
        case 'port':
            if (value !== '' && isNaN(value)) {
                return 'Port must be a number';
            }
            return;
    }
}

function validForm(form) {

    const error = {};

    Object.keys(form).forEach(prop => {
        const valid = validField(prop, form[prop]);
        if (valid) {
            error[prop] = valid;
        }
    });

    return error;

}

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
                error: validForm(form)
            };

        }

        case actionTypes.VALID_CREATE_APPLICATION_FORM: {
            return {
                ...state,
                error: validForm(state.form)
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
