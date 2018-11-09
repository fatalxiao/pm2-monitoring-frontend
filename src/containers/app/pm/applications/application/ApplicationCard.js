import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

import ApplicationInfo from './grid/ApplicationInfo';
import ApplicationCtrls from '../../common/ApplicationCtrls';

import 'scss/containers/app/pm/applications/application/ApplicationCard.scss';

class ApplicationCard extends Component {

    constructor(props) {
        super(props);
    }

    goToDetail = () => {

        const {data, routerPush} = this.props;

        if (!data || !data.name || !routerPush) {
            return;
        }

        routerPush(`/app/pm/application/${data.name}/overview`);

    };

    render() {

        const {style, data} = this.props,
            className = classNames('application-card', data.status);

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

ApplicationCard.propTypes = {

    data: PropTypes.object,
    layoutType: PropTypes.string,

    routerPush: PropTypes.func

};

export default connect(state => ({
    layoutType: state.nav.layoutType
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(ApplicationCard);
