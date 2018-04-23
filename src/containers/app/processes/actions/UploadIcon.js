import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import IconButton from 'alcedo-ui/IconButton';
import UploadDialog from './UploadDialog';

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

        const {data} = this.props,
            {dialogVisible} = this.state;

        return (
            <Fragment>

                <IconButton iconCls="fas fa-upload"
                            onTouchTap={this.showDialog}/>

                <UploadDialog visible={dialogVisible}
                              data={data}
                              onRequestClose={this.hideDialog}/>

            </Fragment>
        );
    }
}

UploadIcon.propTypes = {

    data: PropTypes.object,

    routerPush: PropTypes.func

};

export default connect(state => ({}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(UploadIcon);