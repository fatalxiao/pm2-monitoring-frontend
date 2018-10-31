import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions/index';

import RaisedButton from 'alcedo-ui/RaisedButton';

class ApplicationSettingRemove extends Component {

    constructor(props) {
        super(props);
    }

    remove = () => {

        const {application, renameApplication} = this.props;

        if (!application || !application.name || !name || !renameApplication) {
            return;
        }

        renameApplication(application.name, name);

    };

    render() {

        const {application, actionType} = this.props,
            isLoading = application && actionType && application.name in actionType;

        if (!application) {
            return null;
        }

        return (
            <div className="application-setting-remove">

                <div className="title">Remove Application</div>
                <div className="danger-block">

                    <div className="label">
                        Once you delete the application, there is no going back. Please be certain.
                    </div>

                    <div className="float-fix">
                        <RaisedButton className="rename-button"
                                      theme={RaisedButton.Theme.ERROR}
                                      value="Remove"
                                      onClick={this.remove}/>
                    </div>

                </div>

            </div>
        );

    }
}

ApplicationSettingRemove.propTypes = {
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
}, dispatch))(ApplicationSettingRemove);
