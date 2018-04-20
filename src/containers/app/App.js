import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import Processes from './processes/Processes';

import 'scss/containers/app/App.scss';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="app">

                <Processes/>

            </div>
        );
    }
}

App.propTypes = {
    getCurrentMonitoringData: PropTypes.func
};

export default connect(state => ({}), dispatch => bindActionCreators(actions, dispatch))(App);