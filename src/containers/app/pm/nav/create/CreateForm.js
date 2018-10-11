import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import Form from '../../common/ApplicationForm';
import GhostButton from 'alcedo-ui/GhostButton';

import 'scss/containers/app/pm/nav/create/CreateForm.scss';

class CreateForm extends Component {

    constructor(props) {
        super(props);
    }

    save = () => {
        const {createApplication} = this.props;
        createApplication && createApplication();
    };

    render() {

        const {activated, data, error, updateField} = this.props,

            className = classNames('create-form-wrapper', {
                activated
            });

        return (
            <div className={className}>
                <div className="create-form-bg">
                    <div className="create-form">

                        <div className="form-title">Create Application</div>

                        <Form data={data}
                              error={error}
                              updateField={updateField}/>

                        <GhostButton className="save-button"
                                     value="Save"
                                     onClick={this.save}/>

                    </div>
                </div>
            </div>
        );
    }
}

CreateForm.propTypes = {

    activated: PropTypes.bool,
    data: PropTypes.object,
    error: PropTypes.object,

    updateField: PropTypes.func,
    createApplication: PropTypes.func

};

export default connect(state => ({
    data: state.createApplication.form,
    error: state.createApplication.error
}), dispatch => bindActionCreators({
    updateField: actions.updateCreateApplicationField,
    createApplication: actions.createApplication
}, dispatch))(CreateForm);
