import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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
        this.setState({
            fileName: /^.*\\(.+?)(\.[^\.]*)?$/.exec(e.target.value)[1]
        });
    }

    render() {

        const {visible, onRequestClose} = this.props,
            {uploadFileKey, fileName} = this.state;

        return (
            <Dialog visible={visible}
                    title="Upload Package"
                    onRequestClose={onRequestClose}>
                <form>

                    <RaisedButton value="Select Package File"
                                  onTouchTap={this.selectFile}/>

                    <div>{fileName}</div>

                    <input key={uploadFileKey}
                           ref="uploadFile"
                           className="invisible-input"
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

    onRequestClose: PropTypes.func

};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(UploadDialog);