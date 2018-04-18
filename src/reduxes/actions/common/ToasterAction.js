import Toaster from 'alcedo-ui/Toaster';
import * as types from 'reduxes/actionTypes';

export const addToaste = toaste => dispatch => {
    dispatch({
        type: types.ADD_TOASTE,
        toaste
    });
};

export const addSuccessToaste = message => dispatch => {
    dispatch({
        type: types.ADD_TOASTE,
        toaste: {
            title: '',
            message,
            iconCls: 'icon-check success',
            type: Toaster.Type.SUCCESS
        }
    });
};

export const addErrorToaste = message => dispatch => {
    dispatch({
        type: types.ADD_TOASTE,
        toaste: {
            title: '',
            message,
            iconCls: 'icon-circle-with-cross error',
            type: Toaster.Type.ERROR
        }
    });
};

export const updateToastes = toastes => dispatch => {
    dispatch({
        type: types.UPDATE_TOASTES,
        toastes
    });
};

export const clearToaste = toastes => dispatch => {
    dispatch({
        type: types.CLEAR_TOASTE
    });
};