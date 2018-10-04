import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';
import {Redirect} from 'react-router-dom';

import * as actions from 'reduxes/actions';

import PageLoading from 'alcedo-ui/PageLoading';

import Dom from 'vendors/Dom';

import 'scss/containers/app/App.scss';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Dom.removeClass(document.querySelector('html'), 'full-size');
    }

    render() {

        const {route, componentLoading} = this.props;

        return (
            <div className="app">

                <PageLoading visible={componentLoading}
                             showStripes={false}/>

                <div className="app-content">

                    {renderRoutes(route.routes)}

                    {
                        location.pathname === '/app' ?
                            <Redirect from="/app" to="/app/pm"/>
                            :
                            null
                    }

                </div>

            </div>
        );

    }
}

App.propTypes = {

    componentLoading: PropTypes.bool,

    routerPush: PropTypes.func

};

export default connect(state => ({
    componentLoading: state.loadComponent.loading
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(App);
