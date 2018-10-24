import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import TextField from 'components/FormTextField';
import Button from 'alcedo-ui/RaisedButton';

import 'scss/containers/app/pm/application/ApplicationSetting.scss';

class ApplicationSetting extends Component {

    constructor(props) {

        super(props);

        this.state = {
            name: props.data.name
        };

    }

    updateField = name => {
        this.setState({
            name
        });
    };

    render() {

        const {data} = this.props,
            {name} = this.state;

        return (
            <div className="application-setting">

                <TextField label="Application Name"
                           isLabelAnimate={false}
                           placeholder="new-application"
                           clearButtonVisible={false}
                           value={name}
                           isErrorPlaceholder={false}
                           onChange={this.updateField}/>

                <div className="label">
                    Rename action will affect <span>Application Root Directory Name</span>.
                    If you use other continuous integration tools (like jenkins),
                    you should make sure your new config is right.
                    Wrong Directory Name will be ignored.
                </div>

                <Button className="rename-button"
                        theme={Button.Theme.WARNING}
                        value="Rename"
                        onClick={this.update}/>

            </div>
        );

    }
}

ApplicationSetting.propTypes = {
    data: PropTypes.object,
    restartApplication: PropTypes.func
};

export default connect(state => ({}), dispatch => bindActionCreators({
    restartApplication: actions.restartApplication
}, dispatch))(ApplicationSetting);
