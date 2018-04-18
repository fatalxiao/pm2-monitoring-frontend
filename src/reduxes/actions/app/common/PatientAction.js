import * as actionTypes from 'reduxes/actionTypes';
import PatientApi from 'apis/app/common/PatientApi';

export const getPatients = () => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_PATIENTS_REQUEST,
                actionTypes.GET_PATIENTS_SUCCESS,
                actionTypes.GET_PATIENTS_FAILURE
            ],
            api: PatientApi.getPatients,
            successResMsgDisabled: true
        }
    });
};

export const getFullPatients = () => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_FULL_PATIENTS_REQUEST,
                actionTypes.GET_FULL_PATIENTS_SUCCESS,
                actionTypes.GET_FULL_PATIENTS_FAILURE
            ],
            api: PatientApi.getFullPatients,
            successResMsgDisabled: true
        }
    });
};

export const updatePatientName = (id, name) => dispatch => {

    if (!id || !name) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.UPDATE_PATIENT_NAME_REQUEST,
                actionTypes.UPDATE_PATIENT_NAME_SUCCESS,
                actionTypes.UPDATE_PATIENT_NAME_FAILURE
            ],
            api: PatientApi.updatePatientName,
            params: {
                id,
                name
            },
            successResMsgDisabled: true
        },
        id,
        name
    });

};

export const updatePatientGroup = (id, group) => dispatch => {

    if (!id || !group) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.UPDATE_PATIENT_GROUP_REQUEST,
                actionTypes.UPDATE_PATIENT_GROUP_SUCCESS,
                actionTypes.UPDATE_PATIENT_GROUP_FAILURE
            ],
            api: PatientApi.updatePatientGroup,
            params: {
                id,
                groupId: group.id
            },
            successResMsgDisabled: true
        },
        id,
        group
    });

};

export const enablePatient = id => dispatch => {

    if (!id) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.ENABLE_PATIENT_REQUEST,
                actionTypes.ENABLE_PATIENT_SUCCESS,
                actionTypes.ENABLE_PATIENT_FAILURE
            ],
            api: PatientApi.enablePatient,
            params: {
                id
            },
            successResMsgDisabled: true
        },
        id
    });

};

export const disablePatient = id => dispatch => {

    if (!id) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.DISABLE_PATIENT_REQUEST,
                actionTypes.DISABLE_PATIENT_SUCCESS,
                actionTypes.DISABLE_PATIENT_FAILURE
            ],
            api: PatientApi.disablePatient,
            params: {
                id
            },
            successResMsgDisabled: true
        },
        id
    });

};