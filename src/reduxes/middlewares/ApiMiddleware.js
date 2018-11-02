import * as actionTypes from 'reduxes/actionTypes';
import RequestManagement from 'reduxes/apis/RequestManagement';
import {addSuccessResMsg, addFailureResMsg} from 'reduxes/actions/common/ResMsgAction';

const ERROR_MSG = 'Server or Network failure. Please try again later or contact administrator.';

export default store => dispatch => action => {

    const options = action[actionTypes.CALL_API];

    // not an api action
    if (typeof options === 'undefined') {
        return dispatch(action);
    }

    const {

            api, header, params, types, contentType, isWebSocket,

            resMsgDisabled, successResMsgDisabled, failureResMsgDisabled,

            successCallback: actionSuccessCallback,
            failureCallback: actionFailureCallback,
            cancelCallback: actionCancelCallback

        } = options,

        [requestType, successType, failureType] = types;

    // parse params
    let paramsSuccessCallback, paramsFailureCallback, restParams;
    if (params) {
        const {successCallback, failureCallback, ...rest} = params;
        paramsSuccessCallback = successCallback;
        paramsFailureCallback = failureCallback;
        restParams = rest;
    }

    // calculate action data
    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[actionTypes.CALL_API];
        return finalAction;
    }

    // dispatch request action
    dispatch(actionWith({
        type: requestType,
        apiParams: restParams
    }));

    if (isWebSocket) {
        api({
            params: restParams,
            successCallback(response, responseData) {

                !resMsgDisabled && !successResMsgDisabled && addSuccessResMsg()(dispatch);

                dispatch(actionWith({
                    type: successType,
                    apiParams: restParams,
                    responseData,
                    response
                }));

                setTimeout(() => {
                    actionSuccessCallback && actionSuccessCallback(responseData, response);
                    paramsSuccessCallback && paramsSuccessCallback();
                }, 0);

            },
            failureCallback(response, responseData) {

                if (!resMsgDisabled && !failureResMsgDisabled) {
                    if (xhr.status === 500) {
                        addFailureResMsg()(dispatch);
                    } else {
                        addFailureResMsg(responseData)(dispatch);
                    }
                }

                dispatch(actionWith({
                    type: failureType,
                    apiParams: restParams,
                    responseData,
                    response,
                    error: response ?
                        (responseData || response.message)
                        :
                        ERROR_MSG
                }));

                setTimeout(() => {
                    actionFailureCallback && actionFailureCallback(responseData, response);
                    paramsFailureCallback && paramsFailureCallback();
                }, 0);

            }
        });
    } else {
        api({
            header,
            params: restParams,
            contentType,
            successCallback(xhr, response, responseData) {

                !resMsgDisabled && !successResMsgDisabled && addSuccessResMsg()(dispatch);

                dispatch(actionWith({
                    type: successType,
                    apiParams: restParams,
                    responseData,
                    response,
                    xhr
                }));

                setTimeout(() => {
                    actionSuccessCallback && actionSuccessCallback(responseData, response, xhr);
                    paramsSuccessCallback && paramsSuccessCallback();
                }, 0);

            },
            failureCallback(xhr, response, responseData) {

                if (xhr[RequestManagement.CANCEL_FLAG] === true) {
                    actionCancelCallback && actionCancelCallback(xhr);
                    return;
                }

                if (!resMsgDisabled && !failureResMsgDisabled) {
                    if (xhr.status === 500) {
                        addFailureResMsg()(dispatch);
                    } else {
                        addFailureResMsg(responseData)(dispatch);
                    }
                }

                dispatch(actionWith({
                    type: failureType,
                    apiParams: restParams,
                    responseData,
                    response,
                    xhr,
                    error: response ?
                        (responseData || response.message)
                        :
                        ERROR_MSG
                }));

                setTimeout(() => {
                    actionFailureCallback && actionFailureCallback(responseData, response, xhr);
                    paramsFailureCallback && paramsFailureCallback();
                }, 0);

            }
        });
    }

};
