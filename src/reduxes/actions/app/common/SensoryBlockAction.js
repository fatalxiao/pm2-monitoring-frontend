import * as actionTypes from 'reduxes/actionTypes';
import SensoryBlockApi from 'apis/app/common/SensoryBlockApi';

export const getSensoryBlocks = () => dispatch => {
    return dispatch({
        [actionTypes.CALL_API]: {
            types: [
                actionTypes.GET_SENSORY_BLOCKS_REQUEST,
                actionTypes.GET_SENSORY_BLOCKS_SUCCESS,
                actionTypes.GET_SENSORY_BLOCKS_FAILURE
            ],
            api: SensoryBlockApi.getSensoryBlocks,
            successResMsgDisabled: true
        }
    });
};