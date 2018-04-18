import Notifier from 'alcedo-ui/Notifier';
import * as types from 'reduxes/actionTypes';

export const addNotifier = notifier => dispatch => {
    dispatch({
        type: types.ADD_NOTIFIER,
        notifier
    });
};

export const addInfoNotifier = message => dispatch => {
    dispatch({
        type: types.ADD_NOTIFIER,
        notifier: {
            title: '',
            message,
            iconCls: 'icon-info-with-circle info',
            type: Notifier.Type.INFO
        }
    });
};

export const addWarningNotifier = message => dispatch => {
    dispatch({
        type: types.ADD_NOTIFIER,
        notifier: {
            title: '',
            message,
            iconCls: 'icon-warning warning',
            type: Notifier.Type.WARNING
        }
    });
};

export const updateNotifiers = notifiers => dispatch => {
    dispatch({
        type: types.UPDATE_NOTIFIERS,
        notifiers
    });
};

export const clearNotifier = notifiers => dispatch => {
    dispatch({
        type: types.CLEAR_NOTIFIER
    });
};