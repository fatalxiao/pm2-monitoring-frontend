import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import 'scss/containers/app/pm/applicationDetail/ApplicationOverView.scss';

class ApplicationOverView extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props;

        return (
            <div className="application-overview">

            </div>
        );

    }
}

ApplicationOverView.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationOverView);
