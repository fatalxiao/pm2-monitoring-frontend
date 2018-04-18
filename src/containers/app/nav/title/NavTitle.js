import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import Crumbs from 'alcedo-ui/Crumbs';

import {getPath} from 'src/config.sitemap';

import 'scss/containers/app/nav/title/NavTitle.scss';

class NavTitle extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {$state} = this.props,
            pathName = location.pathname,
            navPath = getPath(pathName, $state);

        return (
            <div className="nav-title">

                {
                    navPath && navPath.length > 0 ?
                        <div className="nav-title-crumbs-wrapper">

                            <i className="icon-location-pin nav-title-crumbs-icon"></i>

                            <Crumbs className="nav-title-crumbs"
                                    data={navPath}
                                    separator="/"
                                    itemRenderer={(item, index) => (
                                        index === navPath.length - 1 ?
                                            <div className="nav-title-crumb">
                                                {item.name}
                                            </div>
                                            :
                                            <Link className="nav-title-crumb nav-title-link"
                                                  to={item.route}>
                                                {item.name}
                                            </Link>
                                    )}/>

                        </div>
                        :
                        null
                }

            </div>
        );

    }
}

NavTitle.propTypes = {
    $state: PropTypes.object
};

export default connect(state => ({
    $state: state
}), dispatch => bindActionCreators(actions, dispatch))(NavTitle);