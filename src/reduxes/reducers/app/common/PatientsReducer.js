import cloneDeep from 'lodash/cloneDeep';

import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    list: [],
    getActionType: '',
    getFullActionType: '',
    enableActionType: '',
    disableActionType: ''
};

function patients(state = initialState, action) {
    switch (action.type) {

        // get patient list
        case actionTypes.GET_PATIENTS_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.GET_PATIENTS_REQUEST
            };
        }
        case actionTypes.GET_PATIENTS_SUCCESS: {
            return {
                ...state,
                list: action.responseData,
                getActionType: actionTypes.GET_PATIENTS_SUCCESS
            };
        }
        case actionTypes.GET_PATIENTS_FAILURE: {
            return {
                ...state,
                list: [],
                getActionType: actionTypes.GET_PATIENTS_FAILURE
            };
        }

        // get full patient list
        case actionTypes.GET_FULL_PATIENTS_REQUEST: {
            return {
                ...state,
                getFullActionType: actionTypes.GET_FULL_PATIENTS_REQUEST
            };
        }
        case actionTypes.GET_FULL_PATIENTS_SUCCESS: {
            return {
                ...state,
                getFullActionType: actionTypes.GET_FULL_PATIENTS_SUCCESS
            };
        }
        case actionTypes.GET_FULL_PATIENTS_FAILURE: {
            return {
                ...state,
                getFullActionType: actionTypes.GET_FULL_PATIENTS_FAILURE
            };
        }

        // update patient name
        case actionTypes.UPDATE_PATIENT_NAME_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.UPDATE_PATIENT_NAME_REQUEST
            };
        }
        case actionTypes.UPDATE_PATIENT_NAME_SUCCESS: {

            const list = cloneDeep(state.list);

            list.find(item => item.id === action.id).name = action.name;

            return {
                ...state,
                list,
                getActionType: actionTypes.UPDATE_PATIENT_NAME_SUCCESS
            };

        }
        case actionTypes.UPDATE_PATIENT_NAME_FAILURE: {
            return {
                ...state,
                getActionType: actionTypes.UPDATE_PATIENT_NAME_FAILURE
            };
        }

        // update patient name
        case actionTypes.UPDATE_PATIENT_GROUP_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.UPDATE_PATIENT_GROUP_REQUEST
            };
        }
        case actionTypes.UPDATE_PATIENT_GROUP_SUCCESS: {

            const list = cloneDeep(state.list),
                item = list.find(item => item.id === action.id);

            item.group = action.group;
            item.groupId = action.group.id;

            return {
                ...state,
                list,
                getActionType: actionTypes.UPDATE_PATIENT_GROUP_SUCCESS
            };

        }
        case actionTypes.UPDATE_PATIENT_GROUP_FAILURE: {
            return {
                ...state,
                getActionType: actionTypes.UPDATE_PATIENT_GROUP_FAILURE
            };
        }

        // enable patient
        case actionTypes.ENABLE_PATIENT_REQUEST: {
            return {
                ...state,
                enableActionType: actionTypes.ENABLE_PATIENT_REQUEST
            };
        }
        case actionTypes.ENABLE_PATIENT_SUCCESS: {

            const list = cloneDeep(state.list);
            list.find(item => item.id === action.id).status = 1;

            return {
                ...state,
                list,
                enableActionType: actionTypes.ENABLE_PATIENT_SUCCESS
            };

        }
        case actionTypes.ENABLE_PATIENT_FAILURE: {
            return {
                ...state,
                enableActionType: actionTypes.ENABLE_PATIENT_FAILURE
            };
        }

        // disable patient
        case actionTypes.DISABLE_PATIENT_REQUEST: {
            return {
                ...state,
                disableActionType: actionTypes.DISABLE_PATIENT_REQUEST
            };
        }
        case actionTypes.DISABLE_PATIENT_SUCCESS: {

            const list = cloneDeep(state.list);
            list.find(item => item.id === action.id).status = 0;

            return {
                ...state,
                list,
                disableActionType: actionTypes.DISABLE_PATIENT_SUCCESS
            };

        }
        case actionTypes.DISABLE_PATIENT_FAILURE: {
            return {
                ...state,
                disableActionType: actionTypes.DISABLE_PATIENT_FAILURE
            };
        }

        default:
            return state;

    }
}

export default patients;