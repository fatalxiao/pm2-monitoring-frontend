import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';
import {Redirect} from 'react-router-dom';

import * as actions from 'reduxes/actions';

import Toaster from 'alcedo-ui/Toaster';
import Notifier from 'alcedo-ui/Notifier';
import App from 'containers/app/App';

import {DEFAULT_ROUTE} from 'src/config.routes';

import 'assets/bootstrap/bootstrap-grid.min.css';
import 'assets/font-awesome/css/fontawesome-all.min.css';
import 'scss/customized/index.scss';
import 'scss/global.scss';
import 'scss/containers/AppRoot.scss';

class AppRoot extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.submitAsyncMsgSeq();
    }

    render() {

        const {$toastes, $notifiers, route, location, clearToaste, clearNotifier} = this.props;

        return (
            <div className="app-root">

                <Toaster toasts={$toastes}
                         position={Toaster.Position.TOP}
                         onToastPop={clearToaste}/>

                <Notifier notifications={$notifiers}
                          position={Notifier.Position.TOP_RIGHT}
                          onNotificationPop={clearNotifier}
                          duration={8000}/>

                <App/>

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

AppRoot.propTypes = {

    $toastes: PropTypes.array,
    $notifiers: PropTypes.array,

    routerReplace: PropTypes.func,
    clearToaste: PropTypes.func,
    clearNotifier: PropTypes.func,
    submitAsyncMsgSeq: PropTypes.func

};

export default connect(state => ({
    $toastes: state.appToaster.toastes,
    $notifiers: state.appNotifier.notifiers
}), dispatch => bindActionCreators(actions, dispatch))(AppRoot);