import _ from 'lodash';
import * as actionTypes from 'reduxes/actionTypes/index';

const BASE_DATA = {
        hasContraction: false,
        vasScore: '',
        thoracicSensoryBlockLeft: null,
        thoracicSensoryBlockRight: null,
        sacralSensoryBlockLeft: null,
        sacralSensoryBlockRight: null,
        bromageScore: '',
        systolicBloodPressure: '',
        diastolicBloodPressure: '',
        heartRate: '',
        pulseOxygenSaturation: '',
        fetalHeartRate: ''
    },
    DEFAULT_TIMEPOINTS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18,
        20, 30, 2 * 60, 3.5 * 60, 5 * 60, 6.5 * 60, 8 * 60];

function getDefaultData(timePoints = DEFAULT_TIMEPOINTS) {
    return timePoints.map(timePoint => ({
        ...BASE_DATA,
        timePoint
    }));
}

const initialState = {

    BASE_DATA,

    data: getDefaultData(),

    getActionType: '',
    updateActionType: ''

};

function analgesia(state = initialState, action) {
    switch (action.type) {

        case actionTypes.RESET_PATIENT_DATA: {
            return {
                ...state,
                data: getDefaultData()
            };
        }

        case actionTypes.APPEND_TIME_POINT: {

            const data = _.cloneDeep(state.data);
            data.push({
                ...BASE_DATA,
                timePoint: data[data.length - 1].timePoint + 1.5 * 60
            });

            return {
                ...state,
                data
            };
        }

        case actionTypes.UPDATE_ANALGESIA_FIELD: {

            const data = _.cloneDeep(state.data),
                updateItem = data.find(item => item.timePoint === action.timePoint);

            if (updateItem) {
                updateItem[action.fieldName] = action.fieldValue;
            }

            if (action.fieldName === 'thoracicSensoryBlockLeft' && updateItem.thoracicSensoryBlockRight === null) {
                updateItem.thoracicSensoryBlockRight = action.fieldValue;
            } else if (action.fieldName === 'thoracicSensoryBlockRight' && updateItem.thoracicSensoryBlockLeft === null) {
                updateItem.thoracicSensoryBlockLeft = action.fieldValue;
            } else if (action.fieldName === 'sacralSensoryBlockLeft' && updateItem.sacralSensoryBlockRight === null) {
                updateItem.sacralSensoryBlockRight = action.fieldValue;
            } else if (action.fieldName === 'sacralSensoryBlockRight' && updateItem.sacralSensoryBlockLeft === null) {
                updateItem.sacralSensoryBlockLeft = action.fieldValue;
            }

            return {
                ...state,
                data
            };

        }

        // get analgesia data
        case actionTypes.GET_ANALGESIA_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.GET_ANALGESIA_REQUEST
            };
        }
        case actionTypes.GET_ANALGESIA_SUCCESS: {

            const data = getDefaultData();

            if (action.responseData && action.responseData.length > 0) {

                for (let resItem of action.responseData) {

                    const item = data.find(a => a.timePoint === resItem.timePoint);

                    if (item) {
                        Object.assign(item, resItem);
                    } else {

                        let timePoint = DEFAULT_TIMEPOINTS[DEFAULT_TIMEPOINTS.length - 1];

                        while (timePoint < resItem.timePoint) {

                            timePoint += 1.5 * 60;

                            if (timePoint >= resItem.timePoint) {
                                data.push(Object.assign({...BASE_DATA, timePoint}, resItem));
                            } else {
                                const i = data.findIndex(a => a.timePoint === timePoint);
                                if (i < 0) {
                                    data.push({...BASE_DATA, timePoint});
                                }
                            }
                        }
                    }
                }
            }

            return {
                ...state,
                data,
                getActionType: actionTypes.GET_ANALGESIA_SUCCESS
            };

        }
        case actionTypes.GET_ANALGESIA_FAILURE: {
            return {
                ...state,
                getActionType: actionTypes.GET_ANALGESIA_FAILURE
            };
        }

        // update analgesia data
        case actionTypes.UPDATE_ANALGESIA_REQUEST: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_ANALGESIA_REQUEST
            };
        }
        case actionTypes.UPDATE_ANALGESIA_SUCCESS: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_ANALGESIA_SUCCESS
            };
        }
        case actionTypes.UPDATE_ANALGESIA_FAILURE: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_ANALGESIA_FAILURE
            };
        }

        default:
            return state;

    }
}

export default analgesia;