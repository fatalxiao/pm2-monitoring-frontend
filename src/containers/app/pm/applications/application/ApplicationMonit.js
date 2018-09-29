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

            cpu = status === 'activated' && data.monit ?
                Calculation.formatCPU(data.monit.cpu)
                :
                '--',

            memory = status === 'activated' && data.monit ?
                Calculation.formatMemory(data.monit.memory)
                :
                '--';

        return (
            <div className="application-monit">
                <div className="application-monit-cpu">
                    <div className="application-monit-title">CPU</div>
                    <div className={classNames('application-monit-value', {
                        activated: status === 'activated'
                    })}>
                        {cpu}
                        <span className="application-monit-unit">%</span>
                    </div>
                </div>
                <div className="application-monit-memory">
                    <div className="application-monit-title">Memory</div>
                    <div className={classNames('application-monit-value', {
                        activated: status === 'activated'
                    })}>
                        {memory}
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
