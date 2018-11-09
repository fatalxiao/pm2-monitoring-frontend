import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

import IconButton from 'alcedo-ui/IconButton';

import 'scss/containers/app/pm/nav/layout/LayoutButton.scss';

class LayoutButton extends Component {

    constructor(props) {
        super(props);
    }

    toggleLayout = () => {

        const {layoutType, layoutGrid, layoutTable} = this.props;

        if (layoutType === actionTypes.LAYOUT_GRID) {
            layoutTable && layoutTable();
        } else {
            layoutGrid && layoutGrid();
        }

    };

    render() {

        const {layoutType} = this.props;

        return (
            <IconButton className="nav-button layout-button"
                        iconCls={layoutType === actionTypes.LAYOUT_GRID ? 'fas fa-th-list' : 'fas fa-th'}
                        onClick={this.toggleLayout}/>
        );

    }
}

LayoutButton.propTypes = {

    layoutType: PropTypes.string,

    layoutGrid: PropTypes.func,
    layoutTable: PropTypes.func

};

export default connect(state => ({
    layoutType: state.nav.layoutType
}), dispatch => bindActionCreators({
    layoutGrid: actions.layoutGrid,
    layoutTable: actions.layoutTable
}, dispatch))(LayoutButton);
