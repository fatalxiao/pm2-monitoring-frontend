import * as actionTypes from 'reduxes/actionTypes';
import ApplicationApi from 'reduxes/apis/app/pm/ApplicationApi';
import {getApplications} from './ApplicationsAction';
import {routerPush} from 'reduxes/actions/common/RouterAction';

export const updateApplication = (applicationName, form) => dispatch => {

    if (!applicationName || !form) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.UPDATE_APPLICATION_REQUEST,
                actionTypes.UPDATE_APPLICATION_SUCCESS,
                actionTypes.UPDATE_APPLICATION_FAILURE
            ],
            api: ApplicationApi.updateApplication,
            params: {
                applicationName,
                form
            },
            successCallback() {
                getApplications()(dispatch);
            }
        }
    });

};

export const uploadApplicationPackage = (applicationName, file) => dispatch => {

    if (!applicationName || !file) {
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.UPLOAD_APPLICATION_PACKAGE_REQUEST,
                actionTypes.UPLOAD_APPLICATION_PACKAGE_SUCCESS,
                actionTypes.UPLOAD_APPLICATION_PACKAGE_FAILURE
            ],
            api: ApplicationApi.uploadApplicationPackage,
            params: {
                applicationName,
                formData
            }
        }
    });

};

export const startApplicationProcess = applicationName => dispatch => {

    if (!applicationName) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.START_APPLICATION_PROCESS_REQUEST,
                actionTypes.START_APPLICATION_PROCESS_SUCCESS,
                actionTypes.START_APPLICATION_PROCESS_FAILURE
            ],
            api: ApplicationApi.startApplicationProcess,
            params: {
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                getApplications()(dispatch);
            }
        }
    });

};

export const stopApplicationProcess = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.STOP_APPLICATION_PROCESS_REQUEST,
                actionTypes.STOP_APPLICATION_PROCESS_SUCCESS,
                actionTypes.STOP_APPLICATION_PROCESS_FAILURE
            ],
            api: ApplicationApi.stopApplicationProcess,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                getApplications()(dispatch);
            }
        }
    });

};

export const restartApplicationProcess = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.RESTART_APPLICATION_PROCESS_REQUEST,
                actionTypes.RESTART_APPLICATION_PROCESS_SUCCESS,
                actionTypes.RESTART_APPLICATION_PROCESS_FAILURE
            ],
            api: ApplicationApi.restartApplicationProcess,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                getApplications()(dispatch);
            }
        }
    });

};

export const deleteApplicationProcess = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.DELETE_APPLICATION_PROCESS_REQUEST,
                actionTypes.DELETE_APPLICATION_PROCESS_SUCCESS,
                actionTypes.DELETE_APPLICATION_PROCESS_FAILURE
            ],
            api: ApplicationApi.deleteApplicationProcess,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                getApplications()(dispatch);
            }
        }
    });

};

export const reloadApplicationProcess = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.RELOAD_APPLICATION_PROCESS_REQUEST,
                actionTypes.RELOAD_APPLICATION_PROCESS_SUCCESS,
                actionTypes.RELOAD_APPLICATION_PROCESS_FAILURE
            ],
            api: ApplicationApi.reloadApplicationProcess,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                getApplications()(dispatch);
            }
        }
    });

};

export const checkApplicationNameExist = applicationName => dispatch => {

    if (!applicationName) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.CHECK_APPLICATION_NAME_EXIST_REQUEST,
                actionTypes.CHECK_APPLICATION_NAME_EXIST_SUCCESS,
                actionTypes.CHECK_APPLICATION_NAME_EXIST_FAILURE
            ],
            api: ApplicationApi.checkApplicationNameExist,
            params: {
                applicationName
            },
            successResMsgDisabled: true
        }
    });

};

export const renameApplication = (applicationName, name) => dispatch => {

    if (!applicationName || !name) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.RENAME_APPLICATION_REQUEST,
                actionTypes.RENAME_APPLICATION_SUCCESS,
                actionTypes.RENAME_APPLICATION_FAILURE
            ],
            api: ApplicationApi.renameApplication,
            params: {
                applicationName,
                name
            },
            successResMsgDisabled: true,
            successCallback() {
                getApplications()(dispatch);
                routerPush(`/app/pm/application/${name}/setting`)(dispatch);
            }
        }
    });

};

export const deleteApplication = applicationName => dispatch => {

    if (!applicationName) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.DELETE_APPLICATION_REQUEST,
                actionTypes.DELETE_APPLICATION_SUCCESS,
                actionTypes.DELETE_APPLICATION_FAILURE
            ],
            api: ApplicationApi.deleteApplication,
            params: {
                applicationName,
                name
            },
            successResMsgDisabled: true,
            successCallback() {
                getApplications()(dispatch);
                routerPush(`/app/pm/applications`)(dispatch);
            }
        }
    });

};
