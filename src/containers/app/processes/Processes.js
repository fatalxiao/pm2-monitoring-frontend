import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import Process from './Process';

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

        return (
            <div className="processes">

                <h1>Processes</h1>

                {
                    data && data.map((item, index) =>
                        <Process key={index}
                                 data={item}/>
                    )
                }

            </div>
        );
    }
}

Processes.propTypes = {
    data: PropTypes.array,
    getProcesses: PropTypes.func
};

export default connect(state => ({
    data: state.processes.data
}), dispatch => bindActionCreators({
    getProcesses: actions.getProcesses
}, dispatch))(Processes);