import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import startCase from 'lodash/startCase';

import * as actions from 'reduxes/actions';

import ProcessActions from './ProcessActions';

import Calculation from 'vendors/Calaulation';

import 'scss/containers/app/processes/Process/Process.scss';

class Process extends Component {

    constructor(props) {
        super(props);
    }

    mapStatus = status => {
        switch (status) {
            case 'online':
                return 'activated';
            case 'stopped':
                return 'paused';
            case 'errored':
                return 'errored';
            default:
                return 'stopped';
        }
    };

    render() {

        const {style, data} = this.props,

            status = this.mapStatus(data.status),

            processClassName = classNames('process', status);

        return (
            <div className={processClassName}
                 style={style}>

                <div className="process-header">
                    <div className="process-name">{data.name}</div>
                    <div className="process-status">{startCase(status)}</div>
                </div>

                <div className="process-desc">{data.description}</div>

                <div className="process-monit">
                    <div className="process-monit-cpu">
                        {`CPU: ${status === 'activated' && data.monit ? Calculation.formatCPU(data.monit.cpu) : '--'}`}
                    </div>
                    <div className="process-monit-memory">
                        {`Memory: ${status === 'activated' && data.monit ? Calculation.formatMemory(data.monit.memory) : '--'}`}
                    </div>
                </div>

                <ProcessActions data={data}
                                status={status}/>

            </div>
        );
    }
}

Process.propTypes = {
    style: PropTypes.object,
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(Process);
