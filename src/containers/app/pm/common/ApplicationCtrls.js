import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions/index';

import FlatButton from 'alcedo-ui/FlatButton';
import PageLoading from 'alcedo-ui/PageLoading';

import 'scss/containers/app/pm/common/ApplicationCtrls.scss';

class ApplicationCtrls extends Component {

    constructor(props) {

        super(props);

        this.state = {
            uploadFieldKey: 1
        };

    }

    stopPropagation = e => {
        e && e.stopPropagation();
    };

    prepareUpload = e => {

        this.stopPropagation(e);

        this.setState({
            uploadFieldKey: ++this.state.uploadFieldKey
        }, () => {

            const uploadFieldEl = this.refs.uploadField;

            if (!uploadFieldEl) {
                return;
            }

            uploadFieldEl.click();

        });

    };

    upload = e => {

        if (!e || !e.target || !e.target.files || !e.target.files[0]) {
            return;
        }

        const {data, uploadApplicationPackage} = this.props;
        data && uploadApplicationPackage && uploadApplicationPackage(data.name, e.target.files[0]);

    };

    startPause = e => {

        this.stopPropagation(e);

        const {data, startApplicationProcess, stopApplicationProcess} = this.props;

        if (!data) {
            return;
        }

        if (data.status === 'online') {
            stopApplicationProcess && stopApplicationProcess(data.pm_id, data.name);
        } else {
            startApplicationProcess && startApplicationProcess(data.name);
        }

    };

    restart = e => {

        this.stopPropagation(e);

        const {data, restartApplicationProcess} = this.props;

        if (!data) {
            return;
        }

        restartApplicationProcess && restartApplicationProcess(data.pm_id, data.name);

    };

    stop = e => {

        this.stopPropagation(e);

        const {data, deleteApplicationProcess} = this.props;

        if (!data) {
            return;
        }

        deleteApplicationProcess && deleteApplicationProcess(data.pm_id, data.name);

    };

    render() {

        const {actionType, data} = this.props,
            {uploadFieldKey} = this.state,
            isLoading = data && actionType && data.name in actionType;

        if (!data) {
            return null;
        }

        return (
            <div className="application-ctrls">

                <input ref="uploadField"
                       key={uploadFieldKey}
                       className="upload-field"
                       name="file"
                       type="file"
                       accept="application/x-zip-compressed"
                       onClick={this.stopPropagation}
                       onChange={this.upload}/>

                <FlatButton className="application-ctrl"
                            iconCls="icon-upload-to-cloud"
                            tip="Upload"
                            disabled={isLoading}
                            onClick={this.prepareUpload}/>

                <FlatButton className="application-ctrl"
                            iconCls={`icon-controller-${data.status === 'online' ? 'paus' : 'play'}`}
                            tip={data.status === 'online' ?
                                'Pause' : (data.status === 'offline' ? 'Start' : 'Continue')}
                            disabled={!data.isReady || isLoading}
                            onClick={this.startPause}/>
                <FlatButton className="application-ctrl"
                            iconCls="icon-cw"
                            tip="Restart"
                            disabled={!data.isReady || isLoading}
                            onClick={this.restart}/>
                <FlatButton className="application-ctrl"
                            iconCls="icon-controller-stop"
                            tip="Stop"
                            disabled={!data.isReady || isLoading}
                            onClick={this.stop}/>

                <PageLoading className="application-loading"
                             visible={isLoading}
                             showStripes={false}/>

            </div>
        );

    }
}

ApplicationCtrls.propTypes = {

    actionType: PropTypes.object,
    data: PropTypes.object,

    uploadApplicationPackage: PropTypes.func,
    startApplicationProcess: PropTypes.func,
    stopApplicationProcess: PropTypes.func,
    restartApplicationProcess: PropTypes.func,
    deleteApplicationProcess: PropTypes.func

};

export default connect(state => ({
    actionType: state.application.actionType
}), dispatch => bindActionCreators({
    uploadApplicationPackage: actions.uploadApplicationPackage,
    startApplicationProcess: actions.startApplicationProcess,
    stopApplicationProcess: actions.stopApplicationProcess,
    restartApplicationProcess: actions.restartApplicationProcess,
    deleteApplicationProcess: actions.deleteApplicationProcess
}, dispatch))(ApplicationCtrls);
