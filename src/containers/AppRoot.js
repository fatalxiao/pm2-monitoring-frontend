import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';

import * as actions from 'reduxes/actions';

import Toaster from 'alcedo-ui/Toaster';
import Notifier from 'alcedo-ui/Notifier';
import App from 'containers/app/App';

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

        const {$getCurrentMonitoringData, $getProcesses} = this.props;

        $getCurrentMonitoringData();
        this.monitoringId = setInterval(() => {
            $getCurrentMonitoringData();
        }, 1000);

        $getProcesses();

    }

    componentWillUnmount() {

        clearInterval(this.monitoringId);
    }

    render() {

        const {$toastes, $notifiers, route, $clearToaste, $clearNotifier} = this.props;

        return (
            <div className="app-root">

                <Toaster toasts={$toastes}
                         position={Toaster.Position.TOP}
                         onToastPop={$clearToaste}/>

                <Notifier notifications={$notifiers}
                          position={Notifier.Position.TOP_RIGHT}
                          onNotificationPop={$clearNotifier}
                          duration={8000}/>

                <App/>

                {renderRoutes(route.routes)}

            </div>
        );
    }

}

AppRoot.propTypes = {

    $toastes: PropTypes.array,
    $notifiers: PropTypes.array,

    $clearToaste: PropTypes.func,
    $clearNotifier: PropTypes.func,
    $getCurrentMonitoringData: PropTypes.func,
    $getProcesses: PropTypes.func

};

export default connect(state => ({
    $toastes: state.appToaster.toastes,
    $notifiers: state.appNotifier.notifiers
}), dispatch => bindActionCreators({
    $clearToaste: actions.clearToaste,
    $clearNotifier: actions.clearNotifier,
    $getCurrentMonitoringData: actions.getCurrentMonitoringData,
    $getProcesses: actions.getProcesses
}, dispatch))(AppRoot);