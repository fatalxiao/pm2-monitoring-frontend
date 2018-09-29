import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

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
                    <div className="process-monit-title">CPU</div>
                    <div className={classNames('process-monit-value', {
                        activated: status === 'activated'
                    })}>
                        {cpu}
                        <span className="process-monit-unit">%</span>
                    </div>
                </div>
                <div className="process-monit-memory">
                    <div className="process-monit-title">Memory</div>
                    <div className={classNames('process-monit-value', {
                        activated: status === 'activated'
                    })}>
                        {memory}
                        <span className="process-monit-unit">MB</span>
                    </div>
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
