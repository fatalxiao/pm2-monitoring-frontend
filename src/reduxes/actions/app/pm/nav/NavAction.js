import * as actionTypes from 'reduxes/actionTypes/index';

export const showCreateApplication = () => dispatch => dispatch({
    type: actionTypes.SHOW_CREATE_APPLICATION
});

export const hideCreateApplication = () => dispatch => dispatch({
    type: actionTypes.HIDE_CREATE_APPLICATION
});
