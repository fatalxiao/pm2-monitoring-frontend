import React, {Component} from 'react';
import PropTypes from 'prop-types';

import TextField from 'alcedo-ui/MaterialTextField';
import TextArea from 'alcedo-ui/MaterialTextArea';
import Accordion from 'alcedo-ui/Accordion';

import 'scss/containers/app/pm/common/ApplicationForm.scss';

class ApplicationForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data, error, updateField} = this.props;

        if (!data) {
            return null;
        }

        return (
            <div className="application-form">

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
                                       placeholder="production"
                                       clearButtonVisible={false}
                                       value={data.env}
                                       onChange={v => updateField('env', v)}/>
                            <div className="form-field-error">{error.env || ''}</div>
                        </div>

                    </div>
                </Accordion>

            </div>
        );
    }
}

ApplicationForm.propTypes = {

    data: PropTypes.object,
    error: PropTypes.object,

    updateField: PropTypes.func

};

export default ApplicationForm;
