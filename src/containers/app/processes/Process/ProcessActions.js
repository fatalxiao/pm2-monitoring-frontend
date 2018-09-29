import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import FlatButton from 'alcedo-ui/FlatButton';

import 'scss/containers/app/processes/Process/ProcessActions.scss';

class ProcessActions extends Component {

    constructor(props) {
        super(props);
    }

    startPause = () => {

        const {data, status, startProcess, pauseProcess} = this.props;

        if (!data) {
            return;
        }

        if (status === 'activated') {
            pauseProcess && pauseProcess(data.pm_id);
        } else {
            startProcess && startProcess(data.name);
        }

    };

    restart = () => {

        const {data, restartProcess} = this.props;

        if (!data) {
            return;
        }

        restartProcess && restartProcess(data.pm_id);

    };

    stop = () => {

        const {data, stopProcess} = this.props;

        if (!data) {
            return;
        }

        stopProcess && stopProcess(data.pm_id);

    };

    render() {

        const {status} = this.props;

        return (
            <div className="process-actions">
                <FlatButton className="process-action"
                            iconCls="icon-upload-to-cloud"
                            tip="Upload"/>
                <FlatButton className="process-action"
                            iconCls={`icon-controller-${status === 'activated' ? 'paus' : 'play'}`}
                            tip={status === 'activated' ? 'Pause' : (status === 'stopped' ? 'Start' : 'Continue')}
                            onClick={this.startPause}/>
                <FlatButton className="process-action"
                            iconCls="icon-cw"
                            tip="Restart"
                            onClick={this.restart}/>
                <FlatButton className="process-action"
                            iconCls="icon-controller-stop"
                            tip="Stop"
                            onClick={this.stop}/>
            </div>
        );
    }
}

ProcessActions.propTypes = {

    data: PropTypes.object,
    status: PropTypes.string,

    startProcess: PropTypes.func,
    pauseProcess: PropTypes.func,
    restartProcess: PropTypes.func,
    stopProcess: PropTypes.func

};

export default connect(state => ({}), dispatch => bindActionCreators({
    startProcess: actions.startProcess,
    pauseProcess: actions.pauseProcess,
    restartProcess: actions.restartProcess,
    stopProcess: actions.stopProcess
}, dispatch))(ProcessActions);
