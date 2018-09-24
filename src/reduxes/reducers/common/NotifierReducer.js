import * as types from 'reduxes/actionTypes/index';

const initialState = {
    notifiers: []
};

function appNotifier(state = initialState, action) {

    switch (action.type) {

        case types.ADD_NOTIFIER: {

            if (!action.notifier) {
                return state;
            }

            const notifiers = state.notifiers.slice();
            notifiers.push(action.notifier);

            return {
                notifiers
            };

        }

        case types.UPDATE_NOTIFIERS: {
            return {
                notifiers: action.notifiers
            };
        }

        case types.CLEAR_NOTIFIER: {
            return {
                notifiers: []
            };
        }

        default:
            return state;

    }
}

export default appNotifier;