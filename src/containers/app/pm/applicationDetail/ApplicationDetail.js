import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import Loading from 'alcedo-ui/CircularLoading';
import IconButton from 'alcedo-ui/IconButton';
import Tab from 'alcedo-ui/Tab';
import OverView from './ApplicationOverView';
import Form from '../common/ApplicationForm';
import Ctrls from '../common/ApplicationCtrls';

import 'scss/containers/app/pm/applicationDetail/ApplicationDetail.scss';

class ApplicationDetail extends Component {

    constructor(props) {

        super(props);

        this.state = {
            init: false
        };

    }

    componentDidMount() {
        this.setState({
            init: true
        });
    }

    render() {

        const {data, match, routerPush} = this.props,
            {init} = this.state,

            application = data && data.find(item => item && item.name === match.params.name),

            wrapperClassName = classNames('application-detail', {
                init
            });

        return (
            <div className={wrapperClassName}>
                {
                    !application ?
                        <Loading/>
                        :
                        <Fragment>

                            <div className="application-detail-title">
                                <div className="application-name">{application.name}</div>
                                <Ctrls data={application}/>
                            </div>

                            <Tab className="application-detail-tab"
                                 tabs={[{
                                     value: 'Overview',
                                     renderer: <OverView data={application}/>
                                 }, {
                                     value: 'Detail',
                                     renderer: <Form data={application}
                                                     updateField={() => {
                                                     }}/>
                                 }]}
                                 isTabFullWidth={false}/>

                            <IconButton className="back-icon"
                                        iconCls="icon-chevron-thin-left"
                                        onClick={() => routerPush('/app/pm/applications')}>
                                <i className="icon-minus extra-icon"></i>
                            </IconButton>

                        </Fragment>
                }
            </div>
        );

    }
}

ApplicationDetail.propTypes = {

    data: PropTypes.array,

    routerPush: PropTypes.func

};

export default connect(state => ({
    data: state.applications.data
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(ApplicationDetail);
