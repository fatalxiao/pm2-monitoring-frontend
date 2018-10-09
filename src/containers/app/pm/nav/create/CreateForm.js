import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import TextField from 'alcedo-ui/MaterialTextField';
import TextArea from 'alcedo-ui/MaterialTextArea';
import Accordion from 'alcedo-ui/Accordion';
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

                        <div className="form-field-wrapper">
                            <TextField className="form-field"
                                       label="Application Name"
                                       isLabelAnimate={false}
                                       placeholder="new-application"
                                       clearButtonVisible={false}
                                       required={true}
                                       value={data.name}
                                       onChange={v => updateField('name', v)}/>
                            <div className="form-field-error">{error.name || ''}</div>
                        </div>

                        <div className="form-field-wrapper">
                            <TextArea className="form-field"
                                      label="Description"
                                      isLabelAnimate={false}
                                      clearButtonVisible={false}
                                      autoHeight={true}
                                      value={data.description}
                                      onChange={v => updateField('description', v)}/>
                            <div className="form-field-error">{error.description || ''}</div>
                        </div>

                        <Accordion className="create-form-advance"
                                   title="Advance"
                                   collapsed={true}
                                   collapseIcon="icon-chevron-thin-down">
                            <div className="create-form-advance-content">

                                <div className="form-field-wrapper">
                                    <TextField className="form-field"
                                               label="Instances"
                                               isLabelAnimate={false}
                                               placeholder="1"
                                               clearButtonVisible={false}
                                               value={data.instances}
                                               onChange={v => updateField('instances', v)}/>
                                    <div className="form-field-error">{error.instances || ''}</div>
                                </div>

                                <div className="form-field-wrapper">
                                    <TextField className="form-field"
                                               label="Script"
                                               isLabelAnimate={false}
                                               placeholder="server.js"
                                               clearButtonVisible={false}
                                               value={data.script}
                                               onChange={v => updateField('script', v)}/>
                                    <div className="form-field-error">{error.script || ''}</div>
                                </div>

                                <div className="form-field-wrapper">
                                    <TextField className="form-field"
                                               label="Port"
                                               isLabelAnimate={false}
                                               placeholder="[config in Script]"
                                               clearButtonVisible={false}
                                               value={data.port}
                                               onChange={v => updateField('port', v)}/>
                                    <div className="form-field-error">{error.port || ''}</div>
                                </div>

                                <div className="form-field-wrapper">
                                    <TextField className="form-field"
                                               label="Environment"
                                               isLabelAnimate={false}
                                               placeholder="development"
                                               clearButtonVisible={false}
                                               value={data.env}
                                               onChange={v => updateField('env', v)}/>
                                    <div className="form-field-error">{error.env || ''}</div>
                                </div>

                            </div>
                        </Accordion>

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
