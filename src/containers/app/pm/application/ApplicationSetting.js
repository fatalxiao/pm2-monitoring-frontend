import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import TextField from 'components/FormTextField';
import RaisedButton from 'alcedo-ui/RaisedButton';

import Valid from 'vendors/Valid';

import 'scss/containers/app/pm/application/ApplicationSetting.scss';

class ApplicationSetting extends Component {

    constructor(props) {

        super(props);

        const application = this.getApplication();
        this.state = {
            name: application ? application.name : '',
            error: null
        };

    }

    getApplication = () => {
        const {match, applications} = this.props;
        return applications && applications.find(item => item && item.name === match.params.name);
    };

    updateField = name => {
        this.setState({
            name,
            error: Valid.validApplicationField('name', name)
        });
    };

    rename = () => {

        const {renameApplication} = this.props,
            application = this.getApplication(),
            {name} = this.state;

        if (!application || !application.name || !name || !renameApplication) {
            return;
        }

        renameApplication(application.name, name);

    };

    render() {

        const {actionType} = this.props,
            {name, error} = this.state,
            application = this.getApplication(),
            isLoading = application && actionType && application.name in actionType;

        if (!application) {
            return null;
        }

        return (
            <div className="application-setting">

                <div className="title">Reset Application Name</div>
                <div className="warning-block">

                    <div className="label">
                        Rename action will also change <span>Application Root Directory Name</span>.
                        If you use other continuous integration tools (like jenkins),
                        you should make sure your new config is right.
                        Wrong directory will be ignored.
                    </div>

                    <TextField label="Application Name"
                               isLabelAnimate={false}
                               placeholder="new-application"
                               clearButtonVisible={false}
                               value={name}
                               error={error}
                               isErrorPlaceholder={false}
                               onChange={this.updateField}/>

                    <div className="float-fix">
                        <RaisedButton className="rename-button"
                                      theme={RaisedButton.Theme.WARNING}
                                      value="Rename"
                                      disabled={application.name === name || isLoading}
                                      onClick={this.rename}/>
                    </div>

                </div>

            </div>
        );

    }
}

ApplicationSetting.propTypes = {
    applications: PropTypes.array,
    actionType: PropTypes.object,
    restartApplication: PropTypes.func,
    renameApplication: PropTypes.func
};

export default connect(state => ({
    applications: state.applications.data,
    actionType: state.application.actionType
}), dispatch => bindActionCreators({
    restartApplication: actions.restartApplication,
    renameApplication: actions.renameApplication
}, dispatch))(ApplicationSetting);
