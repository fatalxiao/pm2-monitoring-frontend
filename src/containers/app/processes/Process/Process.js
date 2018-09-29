import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import ProcessInfo from './ProcessInfo';
import ProcessActions from './ProcessActions';

import 'scss/containers/app/processes/Process/Process.scss';

class Process extends Component {

    constructor(props) {
        super(props);
    }

    mapStatus = status => {
        switch (status) {
            case 'online':
                return 'activated';
            case 'stopped':
                return 'paused';
            case 'errored':
                return 'errored';
            default:
                return 'stopped';
        }
    };

    render() {

        const {style, data} = this.props,

            status = this.mapStatus(data.status),

            processClassName = classNames('process', status);

        return (
            <div className={processClassName}
                 style={style}>

                <ProcessInfo data={data}
                             status={status}/>

                <ProcessActions data={data}
                                status={status}/>

            </div>
        );
    }
}

Process.propTypes = {
    style: PropTypes.object,
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(Process);
