import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';

import * as actions from 'reduxes/actions';

import Nav from './nav/Nav';
import NavTitle from './nav/title/NavTitle';
import PageLoading from 'alcedo-ui/PageLoading';
import ReactCSSTransitionGroup from 'react-addons-transition-group';

import Dom from 'vendors/Dom';

import 'scss/containers/app/App.scss';

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            loadingId: 1
        };

        this.finishLoading = this::this.finishLoading;

    }

    finishLoading() {
        setTimeout(() => {
            this.setState({
                loadingId: ++this.state.loadingId
            });
        }, 250);
    }

    componentWillMount() {

        const {getGroups, getSensoryBlocks, getPatients} = this.props;

        getGroups();
        getSensoryBlocks();
        getPatients();

    }

    componentDidMount() {
        Dom.removeClass(document.querySelector('html'), 'full-size');
    }

    render() {

        const {route, $componentLoading} = this.props,
            {loadingId} = this.state;

        return (
            <div className="app">

                <Nav/>

                <div ref="appContent"
                     className="app-content">

                    <ReactCSSTransitionGroup>
                        {
                            $componentLoading ?
                                <PageLoading key={loadingId}
                                             onRequestClose={this.finishLoading}/>
                                :
                                null
                        }
                    </ReactCSSTransitionGroup>

                    <NavTitle/>

                    {renderRoutes(route.routes)}

                </div>

            </div>
        );

    }
}

App.propTypes = {

    $componentLoading: PropTypes.bool,

    getGroups: PropTypes.func,
    getSensoryBlocks: PropTypes.func,
    getPatients: PropTypes.func

};

function mapStateToProps(state, ownProps) {
    return {
        $componentLoading: state.loadComponent.loading
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);