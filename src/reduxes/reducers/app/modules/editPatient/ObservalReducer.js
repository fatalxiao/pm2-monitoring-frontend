import cloneDeep from 'lodash/cloneDeep';
import * as actionTypes from 'reduxes/actionTypes/index';

const DEFAULT_FORM = {
        initialTime: '',
        testDose: '3',
        initialDose: '8',
        pumpConsumption: '',
        bolus: '',
        hasCarbetocin: false,
        hasHemabate: false,
        pcaCount: '',
        manualBolusCount: '',
        firstPcaTime: '',
        firstManualBolusTime: '',
        durationOfFirstStageOfLabor: '',
        durationOfFirstStageOfLaborHours: '',
        durationOfFirstStageOfLaborMinutes: '',
        durationOfSecondStageOfLabor: '',
        durationOfSecondStageOfLaborHours: '',
        durationOfSecondStageOfLaborMinutes: '',
        hasEpiduralCatheterAdjuestment: false,
        hasEpiduralcatheterReplacement: false,
        hasPrenatalFever: false,
        hasVasoactiveAgent: false,
        isIVEpiduralCatheterInsertion: false,
        isIntrathecalEpiduralCatheterInsertion: false,
        isUnabledToPunctureDura: false,
        hasNausea: false,
        hasVomit: false,
        hasPruritus: false,
        hasHypotension: false,
        hasCaesareanSection: false,
        hasInstrumental: false,
        hasPostduralPunctureHeadache: false,
        hasBackPain: false,
        hasParesthesia: false,
        bloodLose: '',
        patientSatisfactionScore: '',
        hasAccidentalDuralPunture: false,
        lateralEpisiotomyVasScore: '',
        hasLateralEpisiotomy: false,
        birthTime: '',
        foetalHeight: '',
        foetalWeight: '',
        oneMinuteApgarScore: '',
        fiveMinuteApgarScore: '',
        hasNicu: false,
        nicuReason: '',
        arterialPh: '',
        arterialBe: '',
        venousPh: '',
        venousBe: '',
        description: ''
    },
    initialState = {

        form: cloneDeep(DEFAULT_FORM),

        getActionType: '',
        updateActionType: ''

    };

function observal(state = initialState, action) {
    switch (action.type) {

        case actionTypes.RESET_PATIENT_DATA: {
            return {
                ...state,
                form: cloneDeep(DEFAULT_FORM)
            };
        }

        case actionTypes.UPDATE_OBSERVAL_FIELD: {

            const form = cloneDeep(state.form);
            form[action.fieldName] = action.fieldValue;

            return {
                ...state,
                form
            };

        }

        // get observal data
        case actionTypes.GET_OBSERVAL_REQUEST: {
            return {
                ...state,
                getActionType: actionTypes.GET_OBSERVAL_REQUEST
            };
        }
        case actionTypes.GET_OBSERVAL_SUCCESS: {

            const form = action.responseData || cloneDeep(DEFAULT_FORM);

            if (form.durationOfFirstStageOfLabor && !isNaN(form.durationOfFirstStageOfLabor)) {
                form.durationOfFirstStageOfLaborHours = ~~(form.durationOfFirstStageOfLabor / 60);
                form.durationOfFirstStageOfLaborMinutes = form.durationOfFirstStageOfLabor % 60;
            }
            if (form.durationOfSecondStageOfLabor && !isNaN(form.durationOfSecondStageOfLabor)) {
                form.durationOfSecondStageOfLaborHours = ~~(form.durationOfSecondStageOfLabor / 60);
                form.durationOfSecondStageOfLaborMinutes = form.durationOfSecondStageOfLabor % 60;
            }

            return {
                ...state,
                form,
                getActionType: actionTypes.GET_OBSERVAL_SUCCESS
            };

        }
        case actionTypes.GET_OBSERVAL_FAILURE: {
            return {
                ...state,
                getActionType: actionTypes.GET_OBSERVAL_FAILURE
            };
        }

        // update observal data
        case actionTypes.UPDATE_OBSERVAL_REQUEST: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_OBSERVAL_REQUEST
            };
        }
        case actionTypes.UPDATE_OBSERVAL_SUCCESS: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_OBSERVAL_SUCCESS
            };
        }
        case actionTypes.UPDATE_OBSERVAL_FAILURE: {
            return {
                ...state,
                updateActionType: actionTypes.UPDATE_OBSERVAL_FAILURE
            };
        }

        default:
            return state;

    }
}

export default observal;