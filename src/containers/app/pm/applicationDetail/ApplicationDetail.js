import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import Loading from 'alcedo-ui/CircularLoading';
import IconButton from 'alcedo-ui/IconButton';
import Tab from 'alcedo-ui/Tab';
import OverView from './ApplicationOverView';
import Form from '../common/ApplicationForm';

import 'scss/containers/app/pm/applicationDetail/ApplicationDetail.scss';

class ApplicationDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data, match, routerPush} = this.props,
            application = data && data.find(item => item && item.name === match.params.name);

        return (
            <div className="application-detail">
                {
                    !application ?
                        <Loading/>
                        :
                        <Fragment>

                            <div className="application-detail-title">
                                {application.name}
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

                            <IconButton className="icon-chevron-thin-left back-icon"
                                        onClick={() => routerPush('/app/pm/applications')}/>

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
