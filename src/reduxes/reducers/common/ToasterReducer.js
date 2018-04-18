import * as types from 'reduxes/actionTypes/index';

const initialState = {
    toastes: []
};

function appToaster(state = initialState, action) {

    switch (action.type) {

        case types.ADD_TOASTE: {

            if (!action.toaste) {
                return state;
            }

            const toastes = state.toastes.slice();
            toastes.push(action.toaste);

            return {
                toastes
            };

        }

        case types.UPDATE_TOASTES: {
            return {
                toastes: action.toastes
            };
        }

        case types.CLEAR_TOASTE: {
            return {
                toastes: []
            };
        }

        default:
            return state;

    }
}

export default appToaster;