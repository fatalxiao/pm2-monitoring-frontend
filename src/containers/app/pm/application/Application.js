import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';

import * as actions from 'reduxes/actions';

import Loading from 'alcedo-ui/CircularLoading';
import IconButton from 'alcedo-ui/IconButton';
import AnchorButton from 'alcedo-ui/AnchorButton';
import Ctrls from '../common/ApplicationCtrls';

import ApplicationTabs from 'statics/ApplicationTabs';

import 'scss/containers/app/pm/application/Application.scss';

class Application extends Component {

    constructor(props) {
        super(props);
    }

    getApplication = () => {
        const {match, applications} = this.props;
        return applications && applications.find(item => item && item.name === match.params.name);
    };

    render() {

        const {route, routerPush} = this.props,
            application = this.getApplication();

        if (!application) {
            return null;
        }

        return (
            <div className="application">
                {
                    !application ?
                        <Loading/>
                        :
                        <Fragment>

                            <div className="application-title">
                                <div className="application-name"
                                     title={application.name}>
                                    {application.name}
                                </div>
                                <Ctrls data={application}/>
                            </div>

                            <div className="application-tabs">
                                {
                                    ApplicationTabs && ApplicationTabs.map(item =>
                                        <NavLink key={item.title}
                                                 className="application-tab-wrapper"
                                                 to={item.getRoute(application.name)}>
                                            <AnchorButton className="application-tab"
                                                          value={item.title}/>
                                        </NavLink>
                                    )
                                }
                            </div>

                            {renderRoutes(route.routes)}

                            <IconButton className='back-icon'
                                        iconCls='icon-chevron-thin-left'
                                        onClick={() => routerPush('/app/pm/applications')}>
                                <i className='icon-minus extra-icon'></i>
                            </IconButton>

                        </Fragment>
                }
            </div>
        );

    }
}

Application.propTypes = {
    applications: PropTypes.array,
    routerPush: PropTypes.func
};

export default connect(state => ({
    applications: state.applications.data
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(Application);
