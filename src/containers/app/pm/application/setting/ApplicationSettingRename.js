import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions/index';

import TextField from 'components/FormTextField';
import RaisedButton from 'alcedo-ui/RaisedButton';

import Valid from 'vendors/Valid';

class ApplicationSettingRename extends Component {

    constructor(props) {

        super(props);

        this.state = {
            name: props.application ? props.application.name : '',
            error: null
        };

    }

    updateField = name => {
        this.setState({
            name,
            error: Valid.validApplicationField('name', name)
        });
    };

    rename = () => {

        const {application, renameApplication} = this.props,
            {name} = this.state;

        if (!application || !application.name || !name || !renameApplication) {
            return;
        }

        renameApplication(application.name, name);

    };

    render() {

        const {application, actionType} = this.props,
            {name, error} = this.state,
            isLoading = application && actionType && application.name in actionType;

        if (!application) {
            return null;
        }

        return (
            <div className="application-setting-rename">

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

ApplicationSettingRename.propTypes = {
    application: PropTypes.object,
    actionType: PropTypes.object,
    restartApplication: PropTypes.func,
    renameApplication: PropTypes.func
};

export default connect(state => ({
    actionType: state.application.actionType
}), dispatch => bindActionCreators({
    restartApplication: actions.restartApplication,
    renameApplication: actions.renameApplication
}, dispatch))(ApplicationSettingRename);
