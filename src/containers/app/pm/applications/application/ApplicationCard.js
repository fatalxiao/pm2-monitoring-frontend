import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

import ApplicationInfo from './grid/ApplicationInfo';
import ApplicationCols from './table/ApplicationCols';
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

        const {className, data, layoutType, ...restprops} = this.props,
            cardClassName = classNames('application-card', data.status, {
                [className]: className
            });

        return (
            <div {...restprops}
                 className={cardClassName}
                 onClick={this.goToDetail}>

                {
                    layoutType === actionTypes.LAYOUT_TABLE ?
                        <ApplicationCols data={data}/>
                        :
                        <ApplicationInfo data={data}/>
                }

                <ApplicationCtrls data={data}/>

            </div>
        );

    }
}

ApplicationCard.propTypes = {

    className: PropTypes.string,
    style: PropTypes.object,

    data: PropTypes.object,
    layoutType: PropTypes.string,

    routerPush: PropTypes.func

};

export default connect(state => ({
    layoutType: state.nav.layoutType
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(ApplicationCard);
