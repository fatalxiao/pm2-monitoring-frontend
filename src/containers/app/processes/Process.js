import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import Calculation from 'vendors/Calaulation';

import 'scss/containers/app/processes/Process.scss';

class Process extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props,
            activated = 'pm_id' in data,
            processClassName = classNames('col-lg-3 col-md-6 col-sm-6 col-xs-12 process', {
                activated
            });

        return (
            <div className={processClassName}>

                <div className="process-name">{data.name}</div>

                <div className="process-monit">
                    <div className="process-monit-cpu">
                        {`CPU: ${activated && data.monit ? Calculation.formatCPU(data.monit.cpu) : '--'}`}
                    </div>
                    <div className="process-monit-memory">
                        {`Memory: ${activated && data.monit ? Calculation.formatMemory(data.monit.memory) : '--'}`}
                    </div>
                </div>

            </div>
        );
    }
}

Process.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(Process);