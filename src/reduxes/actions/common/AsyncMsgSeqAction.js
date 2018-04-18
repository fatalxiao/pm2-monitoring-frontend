import {addSuccessToaste, addErrorToaste} from './ToasterAction';
import {addInfoNotifier, addWarningNotifier} from './NotifierAction';

import * as types from 'reduxes/actionTypes';

import {STORAGE_NAME, MsgType} from 'vendors/AsyncMsgSeq';

function getMsgSeqFromStorage() {

    const DEFAULT_SEQ = {
            toasts: [],
            notifications: []
        },
        notificationsJson = sessionStorage.getItem(STORAGE_NAME);

    if (!notificationsJson) {
        sessionStorage.removeItem(STORAGE_NAME);
        return DEFAULT_SEQ;
    }

    try {
        const notifications = JSON.parse(notificationsJson);
        return notifications ? notifications : DEFAULT_SEQ;
    } catch (e) {
        return DEFAULT_SEQ;
    }

}

export const addSuccessToastAsync = message => dispatch => {
    dispatch({
        type: types.ADD_SUCCESS_TOAST_ASYNC,
        message
    });
};

export const addErrorToastAsync = message => dispatch => {
    dispatch({
        type: types.ADD_ERROR_TOAST_ASYNC,
        message
    });
};

export const addInfoNotificationAsync = message => dispatch => {
    dispatch({
        type: types.ADD_INFO_NOTIFICATION_ASYNC,
        message
    });
};

export const addWarningNotificationAsync = message => dispatch => {
    dispatch({
        type: types.ADD_WARNING_NOTIFICATION_ASYNC,
        message
    });
};

export const submitAsyncMsgSeq = () => dispatch => {

    const sequence = getMsgSeqFromStorage();

    if (!sequence) {
        return;
    }

    if (sequence.toasts && sequence.toasts.length > 0) {
        for (let config of sequence.toasts) {

            if (!config) {
                continue;
            }

            if (config.type === MsgType.SUCCESS) {
                addSuccessToaste(config.message)(dispatch);
            }

            if (config.type === MsgType.ERROR) {
                addErrorToaste(config.message)(dispatch);
            }

        }
    }

    if (sequence.notifications && sequence.notifications.length > 0) {
        for (let config of sequence.notifications) {

            if (!config) {
                continue;
            }

            if (config.type === MsgType.INFO) {
                addInfoNotifier(config.message)(dispatch);
            }

            if (config.type === MsgType.WARNING) {
                addWarningNotifier(config.message)(dispatch);
            }

        }
    }

    dispatch({
        type: types.CLEAR_ASYNC_MSG_SEQ
    });

};