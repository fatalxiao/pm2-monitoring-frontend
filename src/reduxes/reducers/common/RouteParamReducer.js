import * as types from 'reduxes/actionTypes/index';

const initialState = {
    report: {
        id: '',
        name: ''
    },
    campaign: {
        id: '',
        name: '',
        strategy: null
    },
    campaignGroup: {
        id: '',
        name: ''
    },
    campaignHotel: {
        id: '',
        name: ''
    }
};

function routeParam(state = initialState, action) {

    switch (action.type) {

        case types.UPDATE_ROUTE_PARAM_REPORT: {
            return {
                ...state,
                report: {
                    ...state.report,
                    ...action.report
                }
            };
        }

        case types.UPDATE_ROUTE_PARAM_CAMPAIGN: {
            return {
                ...state,
                campaign: {
                    ...state.campaign,
                    ...action.campaign
                }
            };
        }

        case types.UPDATE_ROUTE_PARAM_CAMPAIGN_GROUP: {
            return {
                ...state,
                campaignGroup: action.campaignGroup
            };
        }

        case types.UPDATE_ROUTE_PARAM_CAMPAIGN_HOTEL: {
            return {
                ...state,
                campaignHotel: action.campaignHotel
            };
        }

        case types.UPDATE_ROUTE_PARAM_CAMPAIGN_STRATEGY: {
            const {strategy} = action;

            return {
                ...state,
                campaign: {
                    ...state.campaign,
                    strategy
                }
            };
        }

        default:
            return state;

    }
}

export default routeParam;