import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import CircularLoading from 'alcedo-ui/CircularLoading';
import Nav from './nav/Nav';
import Applications from './applications/Applications';

import 'scss/containers/app/pm/PM.scss';

class PM extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {getApplications} = this.props;
        getApplications && getApplications();
    }

    render() {

        const {route, init} = this.props,

            loadWrapperClassName = classNames('loading-wrapper', {
                activated: init
            }),

            loadClassName = classNames('loading');

        return (
            <div className="pm">

                <Nav/>
                <Applications/>

                <div className={loadWrapperClassName}>
                    <CircularLoading className={loadClassName}/>
                </div>

                {renderRoutes(route.routes)}

            </div>
        );
    }
}

PM.propTypes = {
    init: PropTypes.bool,
    getApplications: PropTypes.func
};

export default connect(state => ({
    init: state.applications.init
}), dispatch => bindActionCreators({
    getApplications: actions.getApplications
}, dispatch))(PM);
