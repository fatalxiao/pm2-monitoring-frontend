import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import ApplicationInfo from './ApplicationInfo';
import ApplicationCtrls from '../../common/ApplicationCtrls';

import 'scss/containers/app/pm/applications/application/Application.scss';

class Application extends Component {

    constructor(props) {
        super(props);
    }

    goToDetail = () => {

        const {data, routerPush} = this.props;

        if (!data || !data.name || !routerPush) {
            return;
        }

        routerPush(`/app/pm/application/${data.name}`);

    };

    render() {

        const {style, data, visible} = this.props,
            className = classNames('application', data.status, {
                visible
            });

        return (
            <div className={className}
                 style={style}
                 onClick={this.goToDetail}>

                <ApplicationInfo data={data}/>

                <ApplicationCtrls data={data}/>

            </div>
        );

    }
}

Application.propTypes = {

    style: PropTypes.object,
    data: PropTypes.object,
    visible: PropTypes.bool,

    routerPush: PropTypes.func

};

export default connect(state => ({}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(Application);
