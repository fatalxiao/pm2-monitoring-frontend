import * as actionTypes from 'reduxes/actionTypes/index';

import Valid from 'vendors/Valid';

const initialState = {
    steps: [{
        title: 'Patient Information'
    }, {
        title: 'Analgesia Data'
    }, {
        title: 'Observal Data'
    }],
    activatedStep: -1
};

function editPatient(state = initialState, action) {
    switch (action.type) {

        case actionTypes.PATIENT_STEP_PREV: {
            return {
                ...state,
                activatedStep: Valid.range(state.activatedStep - 1, 0, state.steps.length - 1)
            };
        }

        case actionTypes.PATIENT_STEP_NEXT: {

            const activatedStep = Valid.range(state.activatedStep + 1, 0, state.steps.length - 1),
                finishedStep = state.finishedStep > activatedStep ? state.finishedStep : activatedStep;

            return {
                ...state,
                activatedStep,
                finishedStep
            };
        }

        case actionTypes.PATIENT_STEP_UPDATE: {
            return {
                ...state,
                activatedStep: action.activatedStep
            };
        }

        default:
            return state;

    }
}

export default editPatient;