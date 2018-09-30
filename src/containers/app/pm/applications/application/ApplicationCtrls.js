import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import FlatButton from 'alcedo-ui/FlatButton';

import 'scss/containers/app/pm/applications/application/ApplicationCtrls.scss';

class ApplicationCtrls extends Component {

    constructor(props) {
        super(props);
    }

    startPause = () => {

        const {data, status, startApplication, stopApplication} = this.props;

        if (!data) {
            return;
        }

        if (status === 'online') {
            stopApplication && stopApplication(data.pm_id);
        } else {
            startApplication && startApplication(data.name);
        }

    };

    restart = () => {

        const {data, restartApplication} = this.props;

        if (!data) {
            return;
        }

        restartApplication && restartApplication(data.pm_id);

    };

    stop = () => {

        const {data, deleteApplication} = this.props;

        if (!data) {
            return;
        }

        deleteApplication && deleteApplication(data.pm_id);

    };

    render() {

        const {status} = this.props;

        return (
            <div className="application-ctrls">
                <FlatButton className="application-ctrl"
                            iconCls="icon-upload-to-cloud"
                            tip="Upload"/>
                <FlatButton className="application-ctrl"
                            iconCls={`icon-controller-${status === 'online' ? 'paus' : 'play'}`}
                            tip={status === 'online' ? 'Pause' : (status === 'offline' ? 'Start' : 'Continue')}
                            onClick={this.startPause}/>
                <FlatButton className="application-ctrl"
                            iconCls="icon-cw"
                            tip="Restart"
                            onClick={this.restart}/>
                <FlatButton className="application-ctrl"
                            iconCls="icon-controller-stop"
                            tip="Stop"
                            onClick={this.stop}/>
            </div>
        );
    }
}

ApplicationCtrls.propTypes = {

    data: PropTypes.object,
    status: PropTypes.string,

    startApplication: PropTypes.func,
    stopApplication: PropTypes.func,
    restartApplication: PropTypes.func,
    deleteApplication: PropTypes.func

};

export default connect(state => ({}), dispatch => bindActionCreators({
    startApplication: actions.startApplication,
    stopApplication: actions.stopApplication,
    restartApplication: actions.restartApplication,
    deleteApplication: actions.deleteApplication
}, dispatch))(ApplicationCtrls);
