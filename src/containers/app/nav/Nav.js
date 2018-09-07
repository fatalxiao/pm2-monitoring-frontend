import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';

import * as actions from 'reduxes/actions';

import Create from './create/Create';

import 'scss/containers/app/nav/Nav.scss';

class Nav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nav-wrapper">
                <div className="nav">
                    <Create/>
                </div>
            </div>
        );
    }
}

Nav.propTypes = {};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(Nav);