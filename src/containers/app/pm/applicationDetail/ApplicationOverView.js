import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Status from '../common/ApplicationStatus';

import 'scss/containers/app/pm/applicationDetail/ApplicationOverView.scss';

class ApplicationOverView extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props;

        return (
            <div className="application-overview">

                <div className="overview-item status">
                    <div className="overview-item-title">Status</div>
                    <Status value={data.status}/>
                </div>

            </div>
        );

    }
}

ApplicationOverView.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationOverView);
