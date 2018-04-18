import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import 'scss/containers/app/nav/bar/NavBarBottom.scss';

class NavBarBottom extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nav-bar-bottom"></div>
        );
    }
}

NavBarBottom.propTypes = {};

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarBottom);