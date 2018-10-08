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

        this.state = {
            avtivated: false
        };

    }

    toggle = () => {
        this.setState({
            avtivated: !this.state.avtivated
        }, () => {
            if (this.state.avtivated) {
                const {initCreateApplicationForm} = this.props;
                initCreateApplicationForm && initCreateApplicationForm();
            }
        });
    };

    render() {

        const {avtivated} = this.state,

            className = classNames('create-button-wrapper', {
                avtivated
            });

        return (
            <div className={className}>

                <div className="create-button-bg"></div>

                <Form avtivated={avtivated}/>

                <IconButton className="create-button"
                            iconCls="icon-plus"
                            onClick={this.toggle}/>

            </div>
        );
    }
}

CreateButton.propTypes = {
    initCreateApplicationForm: PropTypes.func
};

export default connect(state => ({}), dispatch => bindActionCreators({
    initCreateApplicationForm: actions.initCreateApplicationForm
}, dispatch))(CreateButton);
