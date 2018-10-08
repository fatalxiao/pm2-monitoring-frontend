import * as actionTypes from 'reduxes/actionTypes';
import ApplicationApi from 'apis/app/pm/ApplicationApi';
import {runGetApplicationsInterval} from './ApplicationsAction';

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

export const startApplication = applicationName => dispatch => {

    if (!applicationName) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.START_APPLICATION_REQUEST,
                actionTypes.START_APPLICATION_SUCCESS,
                actionTypes.START_APPLICATION_FAILURE
            ],
            api: ApplicationApi.startApplication,
            params: {
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const stopApplication = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.PAUSE_APPLICATION_REQUEST,
                actionTypes.PAUSE_APPLICATION_SUCCESS,
                actionTypes.PAUSE_APPLICATION_FAILURE
            ],
            api: ApplicationApi.stopApplication,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const restartApplication = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.RESTART_APPLICATION_REQUEST,
                actionTypes.RESTART_APPLICATION_SUCCESS,
                actionTypes.RESTART_APPLICATION_FAILURE
            ],
            api: ApplicationApi.restartApplication,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const deleteApplication = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.STOP_APPLICATION_REQUEST,
                actionTypes.STOP_APPLICATION_SUCCESS,
                actionTypes.STOP_APPLICATION_FAILURE
            ],
            api: ApplicationApi.deleteApplication,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};

export const reloadApplication = (processId, applicationName) => dispatch => {

    if (processId == undefined) {
        return;
    }

    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.RELOAD_APPLICATION_REQUEST,
                actionTypes.RELOAD_APPLICATION_SUCCESS,
                actionTypes.RELOAD_APPLICATION_FAILURE
            ],
            api: ApplicationApi.reloadApplication,
            params: {
                processId,
                applicationName
            },
            successResMsgDisabled: true,
            successCallback() {
                runGetApplicationsInterval()(dispatch);
            }
        }
    });

};
