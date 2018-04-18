import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import FlatButton from 'alcedo-ui/FlatButton';
import PatientList from './NavPatientList';

import 'scss/containers/app/nav/patients/NavPatientListWrapper.scss';

class NavPatientListWrapper extends Component {

    constructor(props) {

        super(props);

        this.goToList = ::this.goToList;

    }

    goToList() {
        this.props.routerPush('/app/patient-list');
    }

    render() {

        const {$patientList} = this.props;

        return (
            <div className="nav-patient-list-wrapper">

                <FlatButton className="all-patients-button"
                            value="All Patients"
                            iconCls="icon-list"
                            onTouchTap={this.goToList}>
                    <span className="patients-count">{`[${$patientList.length}]`}</span>
                </FlatButton>

                <PatientList/>

            </div>
        );

    }
}

NavPatientListWrapper.propTypes = {

    $patientList: PropTypes.array,

    routerPush: PropTypes.func

};

export default connect(state => ({
    $patientList: state.patients.list
}), dispatch => bindActionCreators(actions, dispatch))(NavPatientListWrapper);