import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Status from '../../../common/ApplicationStatus';

import 'scss/containers/app/pm/applications/application/table/ApplicationCols.scss';

class ApplicationCols extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props;

        if (!data) {
            return null;
        }

        return (
            <div className="application-cols">

                <div className="application-name"
                     title={data.name}>
                    {data.name}
                </div>

                <Status value={data.status}/>

            </div>
        );

    }
}

ApplicationCols.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationCols);
