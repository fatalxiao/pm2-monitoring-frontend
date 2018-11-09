import * as actionTypes from 'reduxes/actionTypes';

const initialState = {
    layout: actionTypes.LAYOUT_GRID,
    isLayoutGroup: false
};

function nav(state = initialState, action) {
    switch (action.type) {

        // switch layout to grid or table
        case actionTypes.LAYOUT_GRID: {
            return {
                ...state,
                layout: actionTypes.LAYOUT_GRID
            };
        }
        case actionTypes.LAYOUT_TABLE: {
            return {
                ...state,
                layout: actionTypes.LAYOUT_TABLE
            };
        }

        // switch layout grouped ot ungrouped
        case actionTypes.LAYOUT_GROUP: {
            return {
                ...state,
                isLayoutGroup: true
            };
        }
        case actionTypes.LAYOUT_UNGROUP: {
            return {
                ...state,
                isLayoutGroup: false
            };
        }

        default:
            return state;

    }
}

export default nav;
