import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import startCase from 'lodash/startCase';

import ProcessMonit from './ProcessMonit';

import 'scss/containers/app/processes/Process/ProcessInfo.scss';

class ProcessInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data, status} = this.props;

        return (
            <div className="process-info">

                <div className="process-header">
                    <div className="process-name">{data.name}</div>
                    <div className="process-status">{startCase(status)}</div>
                </div>

                <div className="process-desc">{data.description}</div>

                <ProcessMonit data={data}
                              status={status}/>

            </div>
        );
    }
}

ProcessInfo.propTypes = {
    data: PropTypes.object,
    status: PropTypes.string
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ProcessInfo);
