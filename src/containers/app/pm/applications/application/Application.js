import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import ApplicationInfo from './ApplicationInfo';
import ApplicationCtrls from './ApplicationCtrls';

import 'scss/containers/app/pm/applications/application/Application.scss';

class Application extends Component {

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

            className = classNames('application', status);

        return (
            <div className={className}
                 style={style}>

                <ApplicationInfo data={data}
                                 status={status}/>

                <ApplicationCtrls data={data}
                                  status={status}/>

            </div>
        );
    }
}

Application.propTypes = {
    style: PropTypes.object,
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(Application);
