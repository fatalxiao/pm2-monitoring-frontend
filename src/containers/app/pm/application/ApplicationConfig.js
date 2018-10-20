import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import * as actions from 'reduxes/actions';

import Form from '../common/ApplicationForm';
import Button from 'alcedo-ui/RaisedButton';

import Valid from 'vendors/Valid';

import 'scss/containers/app/pm/application/ApplicationConfig.scss';

class ApplicationConfig extends Component {

    constructor(props) {

        super(props);

        this.state = {
            form: this.getForm(),
            error: {}
        };

    }

    isFormNoChange = () => {
        return isEqual(this.getForm(), this.state.form);
    };

    getForm = (data = this.props.data) => {

        const form = cloneDeep(data),
            {description, instances, script, port, env} = form;

        return {
            description,
            instances,
            script,
            port,
            env
        };

    };

    updateField = (prop, value) => {

        const form = cloneDeep(this.state.form);
        form[prop] = value;

        this.setState({
            form,
            error: Valid.validApplicationForm(form)
        });

    };

    update = () => {

        const {data, updateApplication} = this.props,
            {form, error} = this.state;

        if (!isEmpty(error) || !updateApplication || this.isFormNoChange()) {
            return;
        }

        updateApplication(data.name, form);

    };

    restart = () => {

        const {data, restartApplication} = this.props;

        if (!data) {
            return;
        }

        restartApplication && restartApplication(data.pm_id, data.name);

    };

    render() {

        const {data} = this.props,
            {form, error} = this.state;

        return (
            <div className="application-config">

                <Form data={form}
                      error={error}
                      updateField={this.updateField}/>

                <div className="action">
                    {
                        data && data.status !== 'offline' && data.lastUpdateTime > data.lastStartTime ?
                            <span className="restart-tip">
                                <span className="restart-anchor"
                                      onClick={this.restart}>
                                    Restart
                                </span>
                                {' to apply new config'}
                            </span>
                            :
                            null
                    }
                    <Button className="update-button"
                            theme={Button.Theme.HIGHLIGHT}
                            value="Update"
                            onClick={this.update}/>
                </div>

            </div>
        );

    }
}

ApplicationConfig.propTypes = {
    data: PropTypes.object,
    updateApplication: PropTypes.func,
    restartApplication: PropTypes.func
};

export default connect(state => ({}), dispatch => bindActionCreators({
    updateApplication: actions.updateApplication,
    restartApplication: actions.restartApplication
}, dispatch))(ApplicationConfig);
