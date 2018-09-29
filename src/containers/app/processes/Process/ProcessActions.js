import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FlatButton from 'alcedo-ui/FlatButton';

import 'scss/containers/app/processes/Process/ProcessActions.scss';

class ProcessActions extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data, status} = this.props;

        return (
            <div className="process-actions">
                <FlatButton className="process-action"
                            iconCls="icon-upload-to-cloud"
                            tip="Upload"/>
                <FlatButton className="process-action"
                            iconCls={`icon-controller-${status === 'activated' ? 'paus' : 'play'}`}
                            tip={status === 'activated' ? 'Pause' : (status === 'stopped' ? 'Start' : 'Continue')}/>
                <FlatButton className="process-action"
                            iconCls="icon-cycle"
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
    status: PropTypes.string
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ProcessActions);
