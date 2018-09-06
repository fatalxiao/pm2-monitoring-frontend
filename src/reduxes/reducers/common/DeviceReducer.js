import Config from 'src/config';
import * as types from 'reduxes/actionTypes/index';

const initialState = {
    isDesktop: window.innerWidth >= Config.desktopMinWidth
};

function device(state = initialState, action) {
    switch (action.type) {

        case types.SWITCH_TO_DESKTOP: {
            return {
                ...state,
                isDesktop: true
            };
        }

        case types.SWITCH_TO_MOBILE: {
            return {
                ...state,
                isDesktop: false
            };
        }

        default:
            return state;

    }
}

export default device;