import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';
import {Redirect} from 'react-router-dom';

import * as actions from 'reduxes/actions';

import Toaster from 'alcedo-ui/Toaster';
import Notifier from 'alcedo-ui/Notifier';

import {DEFAULT_ROUTE} from 'src/config.routes';

import 'assets/font-awesome/css/fontawesome-all.min.css';
import 'assets/icomoon/style.css';
import 'scss/global.scss';
import 'scss/containers/Root.scss';

class Root extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {
            route, location,
            toastes, notifiers, clearToaste, clearNotifier
        } = this.props;

        return (
            <div className="root">

                <Toaster toasts={toastes}
                         position={Toaster.Position.TOP}
                         onToastPop={clearToaste}/>

                <Notifier notifications={notifiers}
                          position={Notifier.Position.TOP_RIGHT}
                          onNotificationPop={clearNotifier}/>

                {renderRoutes(route.routes)}

                {
                    location.pathname === '/' ?
                        <Redirect from="/" to={DEFAULT_ROUTE}/>
                        :
                        null
                }

            </div>
        );
    }

}

Root.propTypes = {

    route: PropTypes.object,
    location: PropTypes.object,

    toastes: PropTypes.array,
    notifiers: PropTypes.array,

    routerReplace: PropTypes.func,
    clearToaste: PropTypes.func,
    clearNotifier: PropTypes.func

};

export default connect(state => ({
    toastes: state.appToaster.toastes,
    notifiers: state.appNotifier.notifiers
}), dispatch => bindActionCreators({
    routerReplace: actions.routerReplace,
    clearToaste: actions.clearToaste,
    clearNotifier: actions.clearNotifier
}, dispatch))(Root);
