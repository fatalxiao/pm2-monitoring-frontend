import {addSuccessToaste, addErrorToaste} from 'reduxes/actions/common/ToasterAction';
import {addWarningNotifier} from 'reduxes/actions/common/NotifierAction';

const DEFAULT_ERROR_MSG = 'Server or Network failure. Please try again later or contact your account manager.';

export const addSuccessResMsg = () => dispatch => {
    addSuccessToaste('Successfully')(dispatch);
};

export const addFailureResMsg = msg => dispatch => {
    addErrorToaste('Failure')(dispatch);
    addWarningNotifier(msg && typeof msg === 'string' ? msg : DEFAULT_ERROR_MSG)(dispatch);
};