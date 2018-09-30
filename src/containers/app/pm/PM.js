import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

import CircularLoading from 'alcedo-ui/CircularLoading';
import Nav from './nav/Nav';
import Applications from './applications/Applications';

import 'scss/containers/app/pm/PM.scss';

class PM extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {runGetApplicationsInterval} = this.props;
        runGetApplicationsInterval && runGetApplicationsInterval();
    }

    render() {

        const {init, getApplicationsActionType} = this.props,

            loadClassName = classNames('loading-wrapper', {
                activated: init && (
                    getApplicationsActionType === actionTypes.GET_APPLICATIONS_REQUEST
                    || getApplicationsActionType === actionTypes.GET_APPLICATIONS_FAILURE
                )
            });

        return (
            <div className="pm">

                <Nav/>
                <Applications/>

                <div className={loadClassName}>
                    <CircularLoading/>
                </div>

            </div>
        );
    }
}

PM.propTypes = {
    init: PropTypes.bool,
    getApplicationsActionType: PropTypes.string,
    runGetApplicationsInterval: PropTypes.func
};

export default connect(state => ({
    init: state.applications.init,
    getApplicationsActionType: state.applications.actionType
}), dispatch => bindActionCreators({
    runGetApplicationsInterval: actions.runGetApplicationsInterval
}, dispatch))(PM);
