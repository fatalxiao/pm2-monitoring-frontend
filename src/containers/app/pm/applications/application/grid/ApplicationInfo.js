import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Monit from './ApplicationMonit';
import Status from '../../../common/ApplicationStatus';

import 'scss/containers/app/pm/applications/application/grid/ApplicationInfo.scss';

class ApplicationInfo extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props;

        if (!data) {
            return null;
        }

        return (
            <div className="application-info">

                <div className="application-header">
                    <div className="application-name"
                         title={data.name}>
                        {data.name}
                    </div>
                    <Status value={data.status}/>
                </div>

                <Monit data={data}
                       status={data.status}/>

            </div>
        );

    }
}

ApplicationInfo.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationInfo);
