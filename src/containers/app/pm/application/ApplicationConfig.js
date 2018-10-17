import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cloneDeep from 'lodash/cloneDeep';

import * as actions from 'reduxes/actions';

import Form from '../common/ApplicationForm';
import Button from 'alcedo-ui/RaisedButton';

import Valid from 'vendors/Valid';

import 'scss/containers/app/pm/application/ApplicationConfig.scss';

class ApplicationConfig extends Component {

    constructor(props) {

        super(props);

        this.state = {
            form: cloneDeep(props.data),
            error: {}
        };

    }

    updateField = (prop, value) => {

        const form = cloneDeep(this.state.form);
        form[prop] = value;

        this.setState({
            form,
            error: Valid.validApplicationForm(form)
        });

    };

    render() {

        const {form, error} = this.state;

        return (
            <div className="application-config">

                <Form data={form}
                      error={error}
                      updateField={this.updateField}/>

                <Button className="update-button"
                        theme={Button.Theme.HIGHLIGHT}
                        value="Update"/>

            </div>
        );

    }
}

ApplicationConfig.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationConfig);
