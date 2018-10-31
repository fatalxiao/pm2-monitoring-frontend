import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Rename from './ApplicationSettingRename';

import 'scss/containers/app/pm/application/setting/ApplicationSetting.scss';
import PropTypes from 'prop-types';

class ApplicationSetting extends Component {

    constructor(props) {
        super(props);
    }

    getApplication = () => {
        const {match, applications} = this.props;
        return applications && applications.find(item => item && item.name === match.params.name);
    };

    render() {

        const application = this.getApplication();

        return (
            <div className="application-setting">
                <Rename application={application}/>
            </div>
        );
    }
}

ApplicationSetting.propTypes = {
    applications: PropTypes.array
};

export default connect(state => ({
    applications: state.applications.data
}), dispatch => bindActionCreators({}, dispatch))(ApplicationSetting);
