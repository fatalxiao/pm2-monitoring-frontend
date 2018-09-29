import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Calculation from 'vendors/Calaulation';

import 'scss/containers/app/processes/Process/ProcessMonit.scss';

class ProcessMonit extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data, status} = this.props,

            cpu = status === 'activated' && data.monit ?
                Calculation.formatCPU(data.monit.cpu)
                :
                '--',

            memory = status === 'activated' && data.monit ?
                Calculation.formatMemory(data.monit.memory)
                :
                '--';

        return (
            <div className="process-monit">
                <div className="process-monit-cpu">
                    {`CPU: ${cpu}`}
                </div>
                <div className="process-monit-memory">
                    {`Memory: ${memory}`}
                </div>
            </div>
        );
    }
}

ProcessMonit.propTypes = {
    data: PropTypes.object,
    status: PropTypes.string
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ProcessMonit);
