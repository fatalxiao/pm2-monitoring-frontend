import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import startCase from 'lodash/startCase';

import ProcessMonit from './ApplicationMonit';

import 'scss/containers/app/pm/applications/application/ApplicationInfo.scss';

class ApplicationInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data, status} = this.props;

        return (
            <div className="application-info">

                <div className="application-header">
                    <div className="application-name">{data.name}</div>
                    <div className="application-status">{startCase(status)}</div>
                </div>

                <div className="application-desc">{data.description}</div>

                <ProcessMonit data={data}
                              status={status}/>

            </div>
        );
    }
}

ApplicationInfo.propTypes = {
    data: PropTypes.object,
    status: PropTypes.string
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationInfo);
