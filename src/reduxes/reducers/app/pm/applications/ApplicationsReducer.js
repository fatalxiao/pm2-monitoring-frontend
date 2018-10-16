import * as actionTypes from 'reduxes/actionTypes';

const MAX_LENGTH = 120,
    initialState = {
        init: true,
        data: null,
        progress: 0,
        actionType: ''
    };

function recordMonit(oldData, data) {

    if (!oldData || !data) {
        return;
    }

    for (let app of data) {

        if (!app) {
            continue;
        }

        let monitRecord;

        const index = oldData.findIndex(item => item && item.name === app.name);
        if (index === -1) {
            monitRecord = [];
        } else {
            monitRecord = oldData[index].monitRecord || [];
        }

        monitRecord.unshift(app.monit);
        if (monitRecord.length > MAX_LENGTH) {
            monitRecord.length = MAX_LENGTH;
        }

        app.monitRecord = monitRecord;

    }

}

function applications(state = initialState, action) {
    switch (action.type) {

        // get application list
        case actionTypes.GET_APPLICATIONS_REQUEST: {
            return {
                ...state,
                actionType: actionTypes.GET_APPLICATIONS_REQUEST
            };
        }
        case actionTypes.GET_APPLICATIONS_SUCCESS: {

            const oldData = state.data,
                data = action.responseData;

            recordMonit(oldData, data);

            return {
                ...state,
                init: false,
                data,
                actionType: actionTypes.GET_APPLICATIONS_SUCCESS
            };

        }
        case actionTypes.GET_APPLICATIONS_FAILURE: {
            return {
                ...state,
                actionType: actionTypes.GET_APPLICATIONS_FAILURE
            };
        }

        case actionTypes.UPDATE_REQUEST_APPLICATIONS_PROGRESS: {
            return {
                ...state,
                progress: action.progress
            };
        }

        default:
            return state;

    }
}

export default applications;
