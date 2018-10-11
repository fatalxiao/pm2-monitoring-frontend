import React, {Component} from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';

import 'scss/containers/app/pm/common/ApplicationStatus.scss';

class ApplicationStatus extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {value} = this.props;

        return (
            <div className="application-status">{startCase(value)}</div>
        );

    }
}

ApplicationStatus.propTypes = {
    value: PropTypes.string
};

export default ApplicationStatus;
