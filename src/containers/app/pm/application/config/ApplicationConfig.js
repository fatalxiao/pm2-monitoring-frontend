import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import * as actions from 'reduxes/actions/index';

import Form from '../../common/ApplicationForm';
import Button from 'alcedo-ui/RaisedButton';

import Valid from 'vendors/Valid';

import 'scss/containers/app/pm/application/config/ApplicationConfig.scss';

class ApplicationConfig extends Component {

    constructor(props) {

        super(props);

        this.state = {
            form: this.getForm(),
            error: {}
        };

    }

    getApplication = () => {
        const {match, applications} = this.props;
        return applications && applications.find(item => item && item.name === match.params.name);
    };

    isFormNoChange = () => {
        return isEqual(this.getForm(), this.state.form);
    };

    getForm = () => {

        const application = this.getApplication(),
            form = cloneDeep(application || {}),
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

        const {updateApplication} = this.props,
            {form, error} = this.state,
            application = this.getApplication();

        if (!application || !isEmpty(error) || !updateApplication || this.isFormNoChange()) {
            return;
        }

        updateApplication(application.name, form);

    };

    restart = () => {

        const {restartApplication} = this.props,
            application = this.getApplication();

        if (!application) {
            return;
        }

        restartApplication && restartApplication(application.pm_id, application.name);

    };

    render() {

        const {form, error} = this.state,
            application = this.getApplication();

        if (!application) {
            return null;
        }

        return (
            <div className="application-config">

                <Form data={form}
                      error={error}
                      updateField={this.updateField}/>

                <div className="action">
                    {
                        application && application.status !== 'offline'
                        && application.lastUpdateTime > application.lastStartTime ?
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
    applications: PropTypes.array,
    updateApplication: PropTypes.func,
    restartApplication: PropTypes.func
};

export default connect(state => ({
    applications: state.applications.data
}), dispatch => bindActionCreators({
    updateApplication: actions.updateApplication,
    restartApplication: actions.restartApplication
}, dispatch))(ApplicationConfig);
