import * as actionTypes from 'reduxes/actionTypes/index';
import PatientApi from 'apis/app/modules/patient/PatientApi';
import {resetPatientData} from 'reduxes/actions/app/modules/editPatient/EditPatientAction';

function gestationalDaysHandler(data) {

    let result = 0;

    if (data.gestationalDaysWeeks && !isNaN(data.gestationalDaysWeeks)) {
        result += +data.gestationalDaysWeeks * 7;
    }

    if (data.gestationalDaysDays && !isNaN(data.gestationalDaysDays)) {
        result += +data.gestationalDaysDays;
    }

    return result;

}

export const updatePatientInfoField = (fieldName, fieldValue) => ({
    type: actionTypes.UPDATE_PATIENT_INFO_FIELD,
    fieldName,
    fieldValue
});

export const getPatientInfo = id => dispatch => {

    if (!id) {
        return;
    }

    resetPatientData()(dispatch);

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_PATIENT_INFO_REQUEST,
                actionTypes.GET_PATIENT_INFO_SUCCESS,
                actionTypes.GET_PATIENT_INFO_FAILURE
            ],
            api: PatientApi.getPatientById,
            params: {id},
            successResMsgDisabled: true
        }
    });

};

export const updatePatientInfo = (id, callback, successResMsgDisabled) => (dispatch, getState) => {

    const data = getState().patientInfo.form;

    if (!id) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.UPDATE_PATIENT_INFO_REQUEST,
                actionTypes.UPDATE_PATIENT_INFO_SUCCESS,
                actionTypes.UPDATE_PATIENT_INFO_FAILURE
            ],
            api: PatientApi.createOrUpdatePatient,
            params: {
                id,
                age: data.age,
                gestationalDays: gestationalDaysHandler(data),
                height: data.height,
                weight: data.weight,
                heartRate: data.heartRate,
                initialVasScore: data.initialVasScore,
                systolicBloodPressure: data.systolicBloodPressure,
                diastolicBloodPressure: data.diastolicBloodPressure,
                fetalHeartRate: data.fetalHeartRate,
                pulseOxygenSaturation: data.pulseOxygenSaturation,
                cervicalDilationAtTimeOfEA: data.cervicalDilationAtTimeOfEA,
                hasOxytocinAtTimeOfEA: data.hasOxytocinAtTimeOfEA,
                description: data.description
            },
            successResMsgDisabled,
            successCallback() {
                callback && callback();
            }
        }
    });

};