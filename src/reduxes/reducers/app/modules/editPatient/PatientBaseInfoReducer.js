import cloneDeep from 'lodash/cloneDeep';
import * as actionTypes from 'reduxes/actionTypes/index';

const DEFAULT_FORM = {
        group: null,
        id: '',
        name: ''
    },

    initialState = {
        form: cloneDeep(DEFAULT_FORM),
        actionType: ''
    };

function patientBaseInfo(state = initialState, action) {
    switch (action.type) {

        case actionTypes.RESET_PATIENT_BASE_INFO: {
            return {
                ...state,
                form: cloneDeep(DEFAULT_FORM)
            };
        }

        case actionTypes.UPDATE_PATIENT_BASE_INFO_FIELD: {

            const form = cloneDeep(state.form);

            form[action.fieldName] = action.fieldValue;

            return {
                ...state,
                form
            };

        }

        // create patient
        case actionTypes.CREATE_PATIENT_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.CREATE_PATIENT_REQUEST
            };
        }
        case actionTypes.CREATE_PATIENT_SUCCESS: {
            return {
                ...state,
                actionType: actionTypes.CREATE_PATIENT_SUCCESS
            };
        }
        case actionTypes.CREATE_PATIENT_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.CREATE_PATIENT_FAILURE
            };
        }

        default:
            return state;

    }
}

export default patientBaseInfo;