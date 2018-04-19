import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import 'scss/containers/app/App.scss';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const {getCurrentMonitoringData} = this.props;

        getCurrentMonitoringData();
        // setInterval(() => {
        //     getCurrentMonitoringData();
        // }, 500);

    }

    render() {
        return (
            <div className="app">

            </div>
        );
    }
}

App.propTypes = {
    getCurrentMonitoringData: PropTypes.func
};

export default connect(state => ({}), dispatch => bindActionCreators(actions, dispatch))(App);