import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import Nav from './nav/Nav';
import Applications from './applications/Applications';

import 'scss/containers/app/pm/PM.scss';

class PM extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {runGetProcessesInterval} = this.props;
        runGetProcessesInterval && runGetProcessesInterval();
    }

    render() {
        return (
            <div className="pm">
                <Nav/>
                <Applications/>
            </div>
        );
    }
}

PM.propTypes = {
    runGetProcessesInterval: PropTypes.func
};

export default connect(state => ({}), dispatch => bindActionCreators({
    runGetProcessesInterval: actions.runGetProcessesInterval
}, dispatch))(PM);
