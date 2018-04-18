import * as actionTypes from 'reduxes/actionTypes/index';
import PatientApi from 'apis/app/modules/patient/PatientApi';
import {getPatients} from 'reduxes/actions/app/common/PatientAction';

export const resetPatientBaseInfo = () => ({
    type: actionTypes.RESET_PATIENT_BASE_INFO
});

export const updatePatientBaseInfoField = (fieldName, fieldValue) => ({
    type: actionTypes.UPDATE_PATIENT_BASE_INFO_FIELD,
    fieldName,
    fieldValue
});

export const createPatient = callback => (dispatch, getState) => {

    const data = getState().patientBaseInfo.form;

    if (!data.id || !data.name || !data.group) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.CREATE_PATIENT_REQUEST,
                actionTypes.CREATE_PATIENT_SUCCESS,
                actionTypes.CREATE_PATIENT_FAILURE
            ],
            api: PatientApi.createPatient,
            params: {
                id: data.id,
                name: data.name,
                groupId: data.group.id
            },
            successCallback() {
                getPatients()(dispatch);
                callback && callback();
            }
        }
    });

};