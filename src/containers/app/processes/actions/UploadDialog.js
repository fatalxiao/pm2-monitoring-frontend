import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import Dialog from 'alcedo-ui/Dialog';
import RaisedButton from 'alcedo-ui/RaisedButton';

class UploadDialog extends Component {

    constructor(props) {

        super(props);

        this.state = {
            uploadFileKey: 1,
            fileName: null
        };

        this.selectFile = ::this.selectFile;
        this.fileChangeHandler = ::this.fileChangeHandler;

    }

    selectFile() {
        this.refs.uploadFile.click();
    }

    fileChangeHandler(e) {

        const fileInput = e.target;

        this.setState({
            fileName: /^.*\\(.+?)(\.[^\.]*)?$/.exec(fileInput.value)[1]
        }, () => {
            const {data} = this.props;
            if (data && data.name) {
                this.props.uploadProcessPackage(data.name, fileInput.files[0]);
            }
        });

    }

    render() {

        const {visible, onRequestClose} = this.props,
            {uploadFileKey, fileName} = this.state;

        return (
            <Dialog visible={visible}
                    title="Upload Package"
                    onRequestClose={onRequestClose}>

                <RaisedButton value="Select Package File"
                              onTouchTap={this.selectFile}/>

                <div>{fileName}</div>

                <form ref="form">
                    <input key={uploadFileKey}
                           ref="uploadFile"
                           className="invisible-input"
                           name="file"
                           type="file"
                           accept="aplication/zip"
                           onChange={this.fileChangeHandler}/>
                </form>

            </Dialog>
        );
    }
}

UploadDialog.propTypes = {

    visible: PropTypes.bool,
    data: PropTypes.object,

    onRequestClose: PropTypes.func,
    uploadProcessPackage: PropTypes.func

};

export default connect(state => ({}), dispatch => bindActionCreators({
    uploadProcessPackage: actions.uploadProcessPackage
}, dispatch))(UploadDialog);