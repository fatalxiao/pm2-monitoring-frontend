import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import 'scss/containers/app/modules/process/Process.scss';

class Process extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="process">

            </div>
        );
    }
}

Process.propTypes = {};

export default connect(state => ({}), dispatch => bindActionCreators(actions, dispatch))(Process);