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

    render() {

        const {avtivated, data, updateField} = this.props,

            className = classNames('create-form-wrapper', {
                avtivated
            });

        return (
            <div className={className}>
                <div className="create-form-bg">
                    <div className="create-form">

                        <div className="form-title">Create Application</div>

                        <TextField className="form-field"
                                   label="Application Name"
                                   isLabelAnimate={false}
                                   placeholder="new-application"
                                   clearButtonVisible={false}
                                   required={true}
                                   value={data.name}
                                   onChange={v => updateField('name', v)}/>

                        <TextArea className="form-field"
                                  label="Description"
                                  isLabelAnimate={false}
                                  clearButtonVisible={false}
                                  autoHeight={true}
                                  value={data.desc}
                                  onChange={v => updateField('desc', v)}/>

                        <Accordion className="create-form-advance"
                                   title="Advance"
                                   collapsed={true}
                                   collapseIcon="icon-chevron-thin-down">
                            <div className="create-form-advance-content">
                                <TextField className="form-field"
                                           label="Instances"
                                           isLabelAnimate={false}
                                           placeholder="1"
                                           clearButtonVisible={false}
                                           value={data.instances}
                                           onChange={v => updateField('instances', v)}/>
                                <TextField className="form-field"
                                           label="Script"
                                           isLabelAnimate={false}
                                           placeholder="server.js"
                                           clearButtonVisible={false}
                                           value={data.script}
                                           onChange={v => updateField('script', v)}/>
                                <TextField className="form-field"
                                           label="Port"
                                           isLabelAnimate={false}
                                           placeholder="[config in Script]"
                                           clearButtonVisible={false}
                                           value={data.port}
                                           onChange={v => updateField('port', v)}/>
                                <TextField className="form-field"
                                           label="Environment"
                                           isLabelAnimate={false}
                                           placeholder="development"
                                           clearButtonVisible={false}
                                           value={data.env}
                                           onChange={v => updateField('env', v)}/>
                                <TextField className="form-field"
                                           label="Production Environment"
                                           isLabelAnimate={false}
                                           placeholder="production"
                                           clearButtonVisible={false}
                                           value={data.envProd}
                                           onChange={v => updateField('envProd', v)}/>
                            </div>
                        </Accordion>

                        <GhostButton className="save-button"
                                     value="Save"/>

                    </div>
                </div>
            </div>
        );
    }
}

CreateForm.propTypes = {

    avtivated: PropTypes.bool,
    data: PropTypes.object,

    updateField: PropTypes.func

};

export default connect(state => ({
    data: state.createApplication.form
}), dispatch => bindActionCreators({
    updateField: actions.updateCreateApplicationField
}, dispatch))(CreateForm);
