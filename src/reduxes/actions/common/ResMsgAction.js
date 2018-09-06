import {addSuccessToaste, addErrorToaste} from 'reduxes/actions/common/ToasterAction';
import {addWarningNotifier} from 'reduxes/actions/common/NotifierAction';

const DEFAULT_ERROR_MSG = 'Server or Network failure. Please try again later or contact your account manager.';

export const addSuccessResMsg = () => dispatch => {
    addSuccessToaste('Successful')(dispatch);
};

export const addFailureResMsg = msg => dispatch => {
    addErrorToaste('Failed')(dispatch);
    addWarningNotifier(msg || DEFAULT_ERROR_MSG)(dispatch);
};