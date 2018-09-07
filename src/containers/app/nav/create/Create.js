import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import CreateButton from './CreateButton';

class Actions extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <CreateButton/>
            </Fragment>
        );
    }
}

Actions.propTypes = {};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(Actions);