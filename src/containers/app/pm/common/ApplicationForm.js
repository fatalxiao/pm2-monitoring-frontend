import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextField from 'components/FormTextField';
import TextArea from 'components/FormTextArea';
import Accordion from 'alcedo-ui/Accordion';

import 'scss/containers/app/pm/common/ApplicationForm.scss';

class ApplicationForm extends Component {

    constructor(props) {
        super(props);
    }

    getFieldClassName = field => {

        const {error} = this.props;

        return classNames('form-field', {
            error: error && error[field]
        });

    };

    render() {

        const {
            data, error, advanceCollapsed, advanced, isEdit,
            updateField, onAdvanceCollpase, onAdvanceExpand
        } = this.props;

        if (!data) {
            return null;
        }

        const fields = (
                <>
                    {
                        isEdit ?
                            null
                            :
                            <TextField className={this.getFieldClassName('name')}
                                       label="Application Name"
                                       isLabelAnimate={false}
                                       placeholder="new-application"
                                       clearButtonVisible={false}
                                       required={true}
                                       value={data.name}
                                       error={error.name}
                                       onChange={v => updateField('name', v)}/>
                    }
                    <TextArea className={this.getFieldClassName('description')}
                              label="Description"
                              isLabelAnimate={false}
                              clearButtonVisible={false}
                              autoHeight={true}
                              value={data.description}
                              error={error.description}
                              onChange={v => updateField('description', v)}/>
                </>
            ),
            advancedFields = (
                <>
                    <TextField className={this.getFieldClassName('instances')}
                               label="Instances"
                               isLabelAnimate={false}
                               placeholder="1"
                               clearButtonVisible={false}
                               value={data.instances}
                               error={error.instances}
                               onChange={v => updateField('instances', v)}/>
                    <TextField className={this.getFieldClassName('script')}
                               label="Script"
                               isLabelAnimate={false}
                               placeholder="server.js"
                               clearButtonVisible={false}
                               value={data.script}
                               error={error.script}
                               onChange={v => updateField('script', v)}/>
                    <TextField className={this.getFieldClassName('port')}
                               label="Port"
                               isLabelAnimate={false}
                               placeholder="[config in Script]"
                               clearButtonVisible={false}
                               value={data.port}
                               error={error.port}
                               onChange={v => updateField('port', v)}/>
                    <TextField className={this.getFieldClassName('env')}
                               label="Environment"
                               isLabelAnimate={false}
                               placeholder="production"
                               clearButtonVisible={false}
                               value={data.env}
                               error={error.env}
                               onChange={v => updateField('env', v)}/>
                </>
            );

        return (
            <div className="application-form">
                {
                    advanced ?
                        <>
                            {fields}
                            <Accordion className="create-form-advance"
                                       title="Advance"
                                       collapsed={advanceCollapsed}
                                       collapseIcon="icon-chevron-thin-down"
                                       onCollpase={onAdvanceCollpase}
                                       onExpand={onAdvanceExpand}>
                                <div className="create-form-advance-content">
                                    {advancedFields}
                                </div>
                            </Accordion>
                        </>
                        :
                        <>
                            {fields}
                            {advancedFields}
                        </>
                }
            </div>
        );

    }
}

ApplicationForm.propTypes = {

    data: PropTypes.object,
    error: PropTypes.object,

    advanceCollapsed: PropTypes.bool,
    advanced: PropTypes.bool,
    isEdit: PropTypes.bool,

    updateField: PropTypes.func,
    onAdvanceCollpase: PropTypes.func,
    onAdvanceExpand: PropTypes.func

};

ApplicationForm.defaultProps = {
    advanceCollapsed: true,
    advanced: false,
    isEdit: true
};

export default ApplicationForm;
