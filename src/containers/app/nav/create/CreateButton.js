import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import RaisedButton from 'alcedo-ui/RaisedButton';

import 'scss/containers/app/nav/create/CreateButton.scss';

class CreateButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RaisedButton className="create-button">

            </RaisedButton>
        );
    }
}

CreateButton.propTypes = {};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(CreateButton);