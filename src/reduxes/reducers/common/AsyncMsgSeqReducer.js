import cloneDeep from 'lodash/cloneDeep';

import * as types from 'reduxes/actionTypes/index';
import {STORAGE_NAME, MsgType} from 'vendors/AsyncMsgSeq';

const Type = {
        TOAST: 'toasts',
        NOTIFICATION: 'notifications'
    },
    DEFAULT_SEQUENCE = {
        toasts: [],
        notifications: []
    },
    initialState = {
        sequence: cloneDeep(DEFAULT_SEQUENCE)
    };

function flushStorage(sequence) {
    sessionStorage.setItem(STORAGE_NAME, JSON.stringify(sequence));
}

function clearStorage() {
    sessionStorage.removeItem(STORAGE_NAME);
}

function asyncMsgSeqReducer(state = initialState, action) {

    switch (action.type) {

        case types.ADD_SUCCESS_TOAST_ASYNC: {

            const sequence = cloneDeep(state.sequence);
            sequence[Type.TOAST].push({
                type: MsgType.SUCCESS,
                message: action.message
            });

            flushStorage(sequence);

            return {
                ...state,
                sequence
            };

        }

        case types.ADD_ERROR_TOAST_ASYNC: {

            const sequence = cloneDeep(state.sequence);
            sequence[Type.TOAST].push({
                type: MsgType.ERROR,
                message: action.message
            });

            flushStorage(sequence);

            return {
                ...state,
                sequence
            };

        }

        case types.ADD_INFO_NOTIFICATION_ASYNC: {

            const sequence = cloneDeep(state.sequence);
            sequence[Type.NOTIFICATION].push({
                type: MsgType.INFO,
                message: action.message
            });

            flushStorage(sequence);

            return {
                ...state,
                sequence
            };

        }

        case types.ADD_WARNING_NOTIFICATION_ASYNC: {

            const sequence = cloneDeep(state.sequence);
            sequence[Type.NOTIFICATION].push({
                type: MsgType.WARNING,
                message: action.message
            });

            flushStorage(sequence);

            return {
                ...state,
                sequence
            };

        }

        case types.CLEAR_ASYNC_MSG_SEQ: {

            const sequence = cloneDeep(DEFAULT_SEQUENCE);

            clearStorage();

            return {
                ...state,
                sequence
            };

        }

        default:
            return state;

    }
}

export default asyncMsgSeqReducer;