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

        const {avtivated} = this.props,

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
                                   required={true}/>

                        <TextArea className="form-field"
                                  label="Description"
                                  isLabelAnimate={false}
                                  clearButtonVisible={false}
                                  autoHeight={true}/>

                        <Accordion className="create-form-advance"
                                   title="Advance"
                                   collapsed={true}
                                   collapseIcon="icon-chevron-thin-down">
                            <div className="create-form-advance-content">
                                <TextField className="form-field"
                                           label="Script"
                                           isLabelAnimate={false}
                                           placeholder="server.js"
                                           clearButtonVisible={false}/>
                                <TextField className="form-field"
                                           label="Port"
                                           isLabelAnimate={false}
                                           placeholder="[config in Script]"
                                           clearButtonVisible={false}/>
                                <TextField className="form-field"
                                           label="Environment"
                                           isLabelAnimate={false}
                                           placeholder="development"
                                           clearButtonVisible={false}/>
                                <TextField className="form-field"
                                           label="Production Environment"
                                           isLabelAnimate={false}
                                           placeholder="production"
                                           clearButtonVisible={false}/>
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
    avtivated: PropTypes.bool
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(CreateForm);
