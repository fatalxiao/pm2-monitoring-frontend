import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import cloneDeep from 'lodash/cloneDeep';

import * as actions from 'reduxes/actions';

import Form from '../common/ApplicationForm';
import Button from 'alcedo-ui/RaisedButton';

import 'scss/containers/app/pm/application/ApplicationConfig.scss';

class ApplicationConfig extends Component {

    constructor(props) {

        super(props);

        this.state = {
            formData: cloneDeep(props.data)
        };

    }

    render() {

        const {formData} = this.state;

        return (
            <div className="application-config">

                <Form data={formData}
                      updateField={() => {

                      }}/>

                <Button value="Save"/>

            </div>
        );

    }
}

ApplicationConfig.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationConfig);
