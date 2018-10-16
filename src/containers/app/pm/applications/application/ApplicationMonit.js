import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import Calculation from 'vendors/Calaulation';

import 'scss/containers/app/pm/applications/application/ApplicationMonit.scss';

class ApplicationMonit extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data, status} = this.props,
            activated = status === 'online',

            cpuClassName = classNames('application-monit-value', {
                activated
            }),
            memoryClassName = classNames('application-monit-value', {
                activated
            });

        return (
            <div className="application-monit">
                <div className="application-monit-cpu">
                    <div className="application-monit-title">CPU</div>
                    <div className={cpuClassName}>
                        {
                            activated && data.monit ?
                                Calculation.formatCPU(data.monit.cpu)
                                :
                                '--'
                        }
                        <span className="application-monit-unit">%</span>
                    </div>
                </div>
                <div className="application-monit-memory">
                    <div className="application-monit-title">Memory</div>
                    <div className={memoryClassName}>
                        {
                            activated && data.monit ?
                                Calculation.formatMemory(data.monit.memory)
                                :
                                '--'
                        }
                        <span className="application-monit-unit">MB</span>
                    </div>
                </div>
            </div>
        );
    }
}

ApplicationMonit.propTypes = {
    data: PropTypes.object,
    status: PropTypes.string
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationMonit);
