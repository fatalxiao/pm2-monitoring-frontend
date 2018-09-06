import * as actionTypes from 'reduxes/actionTypes';

export const updateRouteParamReport = report => dispatch => {
    dispatch({
        type: actionTypes.UPDATE_ROUTE_PARAM_REPORT,
        report
    });
};

export const updateRouteParamCampaign = campaign => dispatch => {
    dispatch({
        type: actionTypes.UPDATE_ROUTE_PARAM_CAMPAIGN,
        campaign
    });
};

export const updateRouteParamCampaignGroup = campaignGroup => dispatch => {
    dispatch({
        type: actionTypes.UPDATE_ROUTE_PARAM_CAMPAIGN_GROUP,
        campaignGroup
    });
};

export const updateRouteParamCampaignHotel = campaignHotel => dispatch => {
    dispatch({
        type: actionTypes.UPDATE_ROUTE_PARAM_CAMPAIGN_HOTEL,
        campaignHotel
    });
};

export const updateRouteParamCampaignStrategy = strategy => dispatch => {
    dispatch({
        type: actionTypes.UPDATE_ROUTE_PARAM_CAMPAIGN_STRATEGY,
        strategy
    });
};