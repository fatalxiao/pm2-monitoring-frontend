import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import AddPatientDialog from 'containers/app/modules/editPatient/patientBaseInfo/AddPatientDialog';

import 'scss/containers/app/nav/patients/NavNoPatient.scss';

class NavNoPatient extends Component {

    constructor(props) {

        super(props);

        this.state = {
            addPatientDialogVisible: false
        };

        this.showAddPatient = ::this.showAddPatient;
        this.hideAddPatient = ::this.hideAddPatient;

    }

    showAddPatient() {
        this.setState({
            addPatientDialogVisible: true
        });
    }

    hideAddPatient() {
        this.setState({
            addPatientDialogVisible: false
        });
    }

    render() {

        const {addPatientDialogVisible} = this.state;

        return (
            <div className="nav-no-patient">

                <i className="icon-plus add-patient-icon"
                   onTouchTap={this.showAddPatient}></i>

                You have no patient now.<br/>
                Would you <span className="add-patient-button"
                                onTouchTap={this.showAddPatient}>Create new Patient</span> ?

                <AddPatientDialog visible={addPatientDialogVisible}
                                  onRequestClose={this.hideAddPatient}/>

            </div>
        );
    }
}

NavNoPatient.propTypes = {
    routerPush: PropTypes.func
};

export default connect(state => ({}), dispatch => bindActionCreators(actions, dispatch))(NavNoPatient);