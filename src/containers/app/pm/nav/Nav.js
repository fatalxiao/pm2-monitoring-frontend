import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import CreateButton from './create/CreateButton';
import Refresh from './refresh/Refresh';
import LayoutButton from './layout/LayoutButton';

import 'scss/containers/app/pm/nav/Nav.scss';

class Nav extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nav">
                <CreateButton/>
                <Refresh/>
                <LayoutButton/>
            </div>
        );
    }
}

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(Nav);
