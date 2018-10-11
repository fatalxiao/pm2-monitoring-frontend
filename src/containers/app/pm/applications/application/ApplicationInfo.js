import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Monit from './ApplicationMonit';
import Status from '../../common/ApplicationStatus';

import 'scss/containers/app/pm/applications/application/ApplicationInfo.scss';

class ApplicationInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data, status} = this.props;

        return (
            <div className="application-info">

                <div className="application-header">
                    <div className="application-name"
                         title={data.name}>
                        {data.name}
                    </div>
                    <Status value={status}/>
                </div>

                <div className="application-desc">
                    {data.description}
                </div>

                <Monit data={data}
                       status={status}/>

            </div>
        );
    }
}

ApplicationInfo.propTypes = {
    data: PropTypes.object,
    status: PropTypes.string
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationInfo);
