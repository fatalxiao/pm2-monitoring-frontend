import * as types from 'reduxes/actionTypes';

export const switchToDesktop = () => dispatch => {
    dispatch({
        type: types.SWITCH_TO_DESKTOP
    });
};

export const switchToMobile = () => dispatch => {
    dispatch({
        type: types.SWITCH_TO_MOBILE
    });
};