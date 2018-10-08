import React, {Component} from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import IconButton from 'alcedo-ui/IconButton';
import Form from './CreateForm';

import 'scss/containers/app/pm/nav/create/CreateButton.scss';

class CreateButton extends Component {

    constructor(props) {
        super(props);
    }

    toggle = () => {
        const {activated, showCreateApplication, hideCreateApplication, initCreateApplicationForm} = this.props;
        if (activated) {
            hideCreateApplication && hideCreateApplication();
        } else {
            showCreateApplication && showCreateApplication();
            initCreateApplicationForm && initCreateApplicationForm();
        }
    };

    render() {

        const {activated} = this.props,

            className = classNames('create-button-wrapper', {
                activated
            });

        return (
            <div className={className}>

                <div className="create-button-bg"></div>

                <Form activated={activated}/>

                <IconButton className="create-button"
                            iconCls="icon-plus"
                            onClick={this.toggle}/>

            </div>
        );
    }
}

CreateButton.propTypes = {

    activated: PropTypes.bool,

    showCreateApplication: PropTypes.func,
    hideCreateApplication: PropTypes.func,
    initCreateApplicationForm: PropTypes.func

};

export default connect(state => ({
    activated: state.createApplication.activated
}), dispatch => bindActionCreators({
    showCreateApplication: actions.showCreateApplication,
    hideCreateApplication: actions.hideCreateApplication,
    initCreateApplicationForm: actions.initCreateApplicationForm
}, dispatch))(CreateButton);
