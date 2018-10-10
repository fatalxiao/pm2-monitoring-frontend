import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

import Progress from 'alcedo-ui/CircularProgress';
import Loading from 'alcedo-ui/CircularLoading';

import config from 'src/config';

import 'scss/containers/app/pm/nav/refresh/Refresh.scss';

class Refresh extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {actionType, progress} = this.props,

            progressClassName = classNames('refresh-progress', {
                activated: actionType !== actionTypes.GET_APPLICATIONS_REQUEST
            }),
            loadingClassName = classNames('refresh-loading', {
                activated: actionType === actionTypes.GET_APPLICATIONS_REQUEST
            });

        return (
            <div className="refresh">
                <Progress className={progressClassName}>
                    {progress + 1}
                </Progress>
                <Loading className={loadingClassName}/>
            </div>
        );

    }
}

Refresh.propTypes = {
    actionType: PropTypes.string,
    progress: PropTypes.number
};

export default connect(state => ({
    actionType: state.applications.actionType,
    progress: state.applications.progress
}), dispatch => bindActionCreators({}, dispatch))(Refresh);
