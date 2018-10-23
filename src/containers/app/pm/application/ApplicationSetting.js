import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import * as actions from 'reduxes/actions';

import Button from 'alcedo-ui/RaisedButton';

import 'scss/containers/app/pm/application/ApplicationSetting.scss';

class ApplicationSetting extends Component {

    constructor(props) {

        super(props);

        this.state = {};

    }

    update = () => {

        const {data, updateApplication} = this.props,
            {form, error} = this.state;

        if (!isEmpty(error) || !updateApplication || this.isFormNoChange()) {
            return;
        }

        updateApplication(data.name, form);

    };

    render() {

        const {data} = this.props,
            {form, error} = this.state;

        return (
            <div className="application-setting">

                <Button className="update-button"
                        theme={Button.Theme.HIGHLIGHT}
                        value="Update"
                        onClick={this.update}/>

            </div>
        );

    }
}

ApplicationSetting.propTypes = {
    data: PropTypes.object,
    updateApplication: PropTypes.func,
    restartApplication: PropTypes.func
};

export default connect(state => ({}), dispatch => bindActionCreators({
    updateApplication: actions.updateApplication,
    restartApplication: actions.restartApplication
}, dispatch))(ApplicationSetting);
