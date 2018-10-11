import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import startCase from 'lodash/startCase';

import 'scss/containers/app/pm/common/ApplicationStatus.scss';

class ApplicationStatus extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {value} = this.props,
            className = classNames('application-status', value);

        return (
            <div className={className}>
                {startCase(value)}
            </div>
        );

    }
}

ApplicationStatus.propTypes = {
    value: PropTypes.string
};

export default ApplicationStatus;
