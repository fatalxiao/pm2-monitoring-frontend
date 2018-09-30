import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import TextField from 'alcedo-ui/MaterialTextField';
import TextArea from 'alcedo-ui/MaterialTextArea';

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
                <div className="create-form">

                    <div className="form-title">Create Application</div>

                    <TextField className="form-field"
                               label="Application Name"
                               isLabelAnimate={false}
                               placeholder="new-application"
                               clearButtonVisible={false}/>

                    <TextArea className="form-field"
                              label="Description"
                              isLabelAnimate={false}
                              clearButtonVisible={false}
                              autoHeight={true}/>

                    <TextField className="form-field"
                               label="Script"
                               isLabelAnimate={false}
                               placeholder="server.js"
                               clearButtonVisible={false}/>

                </div>
            </div>
        );
    }
}

CreateForm.propTypes = {
    avtivated: PropTypes.bool
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(CreateForm);
