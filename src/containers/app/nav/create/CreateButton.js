import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import 'scss/containers/app/nav/create/CreateButton.scss';

class CreateButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="create-button">

            </div>
        );
    }
}

CreateButton.propTypes = {};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(CreateButton);