import * as types from 'reduxes/actionTypes';

export const loadComponentStart = () => dispatch => dispatch({
    type: types.LOAD_COMPONENT_START
});

export const loadComponentComplete = () => dispatch => dispatch({
    type: types.LOAD_COMPONENT_COMPLETE
});