import * as actionTypes from 'reduxes/actionTypes/index';
import AnalgesiaApi from 'apis/app/modules/patient/AnalgesiaApi';

function sensoryBlockHandler(keys, item, result) {
    for (let key of keys) {
        if (item[key]) {
            result[`${key}Value`] = item[key].value;
        }
    }
}

function AnalgesiaDataHandler(data, {BASE_DATA}) {

    return data.filter(item => {

        if (!item) {
            return false;
        }

        const {timePoint, ...restItem} = item;

        return JSON.stringify(restItem) !== JSON.stringify(BASE_DATA);

    }).map(item => {

        const result = {
            timePoint: item.timePoint,
            hasContraction: item.hasContraction,
            vasScore: item.vasScore,
            bromageScore: item.bromageScore,
            systolicBloodPressure: item.systolicBloodPressure,
            diastolicBloodPressure: item.diastolicBloodPressure,
            heartRate: item.heartRate,
            pulseOxygenSaturation: item.pulseOxygenSaturation,
            fetalHeartRate: item.fetalHeartRate
        };

        sensoryBlockHandler([
            'thoracicSensoryBlockLeft',
            'thoracicSensoryBlockRight',
            'sacralSensoryBlockLeft',
            'sacralSensoryBlockRight'
        ], item, result);

        return result;

    });

}

export const appendTimePoint = () => ({
    type: actionTypes.APPEND_TIME_POINT
});

export const updateAnalgesiaDataField = (timePoint, fieldName, fieldValue) => ({
    type: actionTypes.UPDATE_ANALGESIA_FIELD,
    timePoint,
    fieldName,
    fieldValue
});

export const getAnalgesiaData = patientId => dispatch => {

    if (!patientId) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_ANALGESIA_REQUEST,
                actionTypes.GET_ANALGESIA_SUCCESS,
                actionTypes.GET_ANALGESIA_FAILURE
            ],
            api: AnalgesiaApi.getAnalgesiaDataByPatientId,
            params: {patientId},
            successResMsgDisabled: true
        }
    });

};

export const createOrUpdateAnalgesiaData = (patientId, callback, successResMsgDisabled) => (dispatch, getState) => {

    const {data} = getState().analgesia;

    if (!patientId || !data) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.UPDATE_ANALGESIA_REQUEST,
                actionTypes.UPDATE_ANALGESIA_SUCCESS,
                actionTypes.UPDATE_ANALGESIA_FAILURE
            ],
            api: AnalgesiaApi.createOrUpdateAnalgesiaData,
            params: {
                patientId,
                analgesiaData: AnalgesiaDataHandler(data, getState().analgesia)
            },
            successResMsgDisabled,
            successCallback() {
                callback && callback();
            }
        }
    });

};