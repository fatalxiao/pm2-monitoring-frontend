import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import Form from '../common/ApplicationForm';

import 'scss/containers/app/pm/application/ApplicationInfo.scss';

class ApplicationInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props;

        return (
            <div className="application-info">

                <Form data={data}
                      updateField={() => {

                      }}/>


            </div>
        );

    }
}

ApplicationInfo.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationInfo);
