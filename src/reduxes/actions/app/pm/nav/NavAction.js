import * as actionTypes from 'reduxes/actionTypes';

export const layoutGrid = () => dispatch => dispatch({
    type: actionTypes.LAYOUT_GRID
});

export const layoutTable = () => dispatch => dispatch({
    type: actionTypes.LAYOUT_TABLE
});

export const layoutGroup = () => dispatch => dispatch({
    type: actionTypes.LAYOUT_GROUP
});

export const layoutUngroup = () => dispatch => dispatch({
    type: actionTypes.LAYOUT_UNGROUP
});
