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
                            tip="Restart"/>
                <FlatButton className="process-action"
                            iconCls="icon-controller-stop"
                            tip="Stop"/>
            </div>
        );
    }
}

ProcessActions.propTypes = {

    data: PropTypes.object,
    status: PropTypes.string,

    startProcess: PropTypes.func,
    pauseProcess: PropTypes.func

};

export default connect(state => ({}), dispatch => bindActionCreators({
    startProcess: actions.startProcess,
    pauseProcess: actions.pauseProcess
}, dispatch))(ProcessActions);
