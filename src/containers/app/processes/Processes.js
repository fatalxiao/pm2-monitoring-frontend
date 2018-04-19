import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import Table from 'alcedo-ui/Table';

import 'scss/containers/app/processes/Processes.scss';

class Processes extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table className="processes">

            </Table>
        );
    }
}

Processes.propTypes = {};

export default connect(state => ({}), dispatch => bindActionCreators(actions, dispatch))(Processes);