import * as actionTypes from 'reduxes/actionTypes';
import GroupApi from 'apis/app/common/GroupApi';

export const getGroups = () => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_GROUPS_REQUEST,
                actionTypes.GET_GROUPS_SUCCESS,
                actionTypes.GET_GROUPS_FAILURE
            ],
            api: GroupApi.getGroups,
            successResMsgDisabled: true
        }
    });
};