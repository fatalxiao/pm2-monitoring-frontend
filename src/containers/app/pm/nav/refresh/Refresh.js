import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

import Progress from 'alcedo-ui/CircularProgress';

import config from 'src/config';

import 'scss/containers/app/pm/nav/refresh/Refresh.scss';

class Refresh extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {actionType, progress, getApplications} = this.props,

            progressClassName = classNames('refresh-progress', {
                activated: actionType !== actionTypes.GET_APPLICATIONS_REQUEST
            });

        return (
            <div className="refresh"
                 onClick={getApplications}>
                <Progress className={progressClassName}
                          r={16}
                          width={1}
                          rgba="#488fdf"
                          percent={(config.refreshInterval - progress) / config.refreshInterval * 100}>
                    <span className="refresh-progress-text">{progress + 1}</span>
                </Progress>
            </div>
        );

    }
}

Refresh.propTypes = {

    actionType: PropTypes.string,
    progress: PropTypes.number,

    getApplications: PropTypes.func

};

export default connect(state => ({
    actionType: state.applications.actionType,
    progress: state.applications.progress
}), dispatch => bindActionCreators({
    getApplications: actions.getApplications
}, dispatch))(Refresh);
