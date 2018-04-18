import cloneDeep from 'lodash/cloneDeep';
import * as actionTypes from 'reduxes/actionTypes/index';

const DEFAULT_FORM = {
        group: null,
        id: '',
        name: '',
        age: '',
        gestationalDaysWeeks: '',
        gestationalDaysDays: '',
        height: '',
        weight: '',
        heartRate: '',
        initialVasScore: '',
        systolicBloodPressure: '',
        diastolicBloodPressure: '',
        fetalHeartRate: '',
        pulseOxygenSaturation: '',
        cervicalDilationAtTimeOfEA: '',
        hasOxytocinAtTimeOfEA: '',
        status: 1,
        description: ''
    },

    initialState = {
        form: cloneDeep(DEFAULT_FORM),
        getActionType: '',
        updateActionType: ''
    };

function patientInfo(state = initialState, action) {
    switch (action.type) {

        case actionTypes.RESET_PATIENT_DATA: {
            return {
                ...state,
                form: cloneDeep(DEFAULT_FORM)
            };
        }

        case actionTypes.UPDATE_PATIENT_INFO_FIELD: {

            const form = cloneDeep(state.form);

            form[action.fieldName] = action.fieldValue;

            return {
                ...state,
                form
            };

        }

        // get patient information
        case actionTypes.GET_PATIENT_INFO_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.GET_PATIENT_INFO_REQUEST
            };
        }
        case actionTypes.GET_PATIENT_INFO_SUCCESS: {

            const form = action.responseData || cloneDeep(DEFAULT_FORM);

            if (form.gestationalDays && !isNaN(form.gestationalDays)) {
                form.gestationalDaysWeeks = ~~(form.gestationalDays / 7);
                form.gestationalDaysDays = form.gestationalDays % 7;
            }

            return {
                ...state,
                form,
                getActionType: actionTypes.GET_PATIENT_INFO_SUCCESS
            };

        }
        case actionTypes.GET_PATIENT_INFO_FAILURE: {
            return {
                ...state,
                getActionType: actionTypes.GET_PATIENT_INFO_FAILURE
            };
        }

        // update patient
        case actionTypes.UPDATE_PATIENT_INFO_REQUEST: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_PATIENT_INFO_REQUEST
            };
        }
        case actionTypes.UPDATE_PATIENT_INFO_SUCCESS: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_PATIENT_INFO_SUCCESS
            };
        }
        case actionTypes.UPDATE_PATIENT_INFO_FAILURE: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_PATIENT_INFO_FAILURE
            };
        }

        default:
            return state;

    }
}

export default patientInfo;