import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';

import * as actions from 'reduxes/actions';

import 'scss/containers/app/processes/Processes.scss';

class Processes extends Component {

    constructor(props) {

        super(props);

        this.runTimeoutId = null;

    }

    run = () => {

        const {getProcesses} = this.props;

        if (getProcesses) {
            getProcesses();
            this.runTimeoutId = setTimeout(() => {
                this.run();
            }, 5000);
        }

    };

    componentDidMount() {
        this.run();
    }

    render() {

        const {data} = this.props;
        console.log(data);

        return (
            <div className="processes">

            </div>
        );
    }
}

Processes.propTypes = {};

export default connect(state => ({
    data: state.processes.data
}), dispatch => bindActionCreators({
    getProcesses: actions.getProcesses
}, dispatch))(Processes);