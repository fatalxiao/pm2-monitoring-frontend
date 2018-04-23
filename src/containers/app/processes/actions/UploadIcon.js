import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import IconButton from 'alcedo-ui/IconButton';
import Dialog from 'alcedo-ui/Dialog';

class UploadIcon extends Component {

    constructor(props) {

        super(props);

        this.state = {
            dialogVisible: false
        };

        this.showDialog = ::this.showDialog;
        this.hideDialog = ::this.hideDialog;

    }

    showDialog() {
        this.setState({
            dialogVisible: true
        });
    }

    hideDialog() {
        this.setState({
            dialogVisible: false
        });
    }

    render() {

        const {dialogVisible} = this.state;

        return (
            <Fragment>

                <IconButton iconCls="fas fa-upload"
                            onTouchTap={this.showDialog}/>

                <Dialog visible={dialogVisible}
                        onRequestClose={this.hideDialog}>

                </Dialog>

            </Fragment>
        );
    }
}

UploadIcon.propTypes = {
    routerPush: PropTypes.func
};

export default connect(state => ({}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(UploadIcon);