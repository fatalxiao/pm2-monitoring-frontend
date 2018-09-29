import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions/index';

import TextField from 'alcedo-ui/TextField';

import 'scss/containers/app/pm/nav/create/CreateForm.scss';

class CreateForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {avtivated} = this.props,

            className = classNames('create-form', {
                avtivated
            });

        return (
            <div className={className}>

                <div className="form-title">Create App</div>

                <label className="form-label">
                    App Name
                    <TextField className="form-field"/>
                </label>

            </div>
        );
    }
}

CreateForm.propTypes = {
    avtivated: PropTypes.bool
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(CreateForm);
