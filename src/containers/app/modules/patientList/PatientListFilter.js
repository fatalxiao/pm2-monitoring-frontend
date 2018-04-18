import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import TextField from 'customized/CustomizedMaterialTextField';
import RaisedButton from 'alcedo-ui/RaisedButton';
import DropdownSelect from 'customized/CustomizedMaterialDropdownSelect';
import AddPatientDialog from 'containers/app/modules/editPatient/patientBaseInfo/AddPatientDialog';

import 'scss/containers/app/modules/patientList/PatientListFilter.scss';

class PatientListFilter extends Component {

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
        }, () => {
            this.props.resetPatientBaseInfo();
        });
    }

    hideAddPatient() {
        this.setState({
            addPatientDialogVisible: false
        });
    }

    render() {

        const {filterValue, groupList, filterGroup, statusList, filterStatus, onFilterChange} = this.props,
            {addPatientDialogVisible} = this.state;

        return (
            <div className="patient-list-filter">

                <div className="patient-filter-wrapper">

                    <TextField className="patient-filter"
                               value={filterValue}
                               placeholder="Search"
                               rightIconCls="icon-magnifying-glass"
                               onChange={value => {
                                   onFilterChange(value, filterGroup, filterStatus);
                               }}/>

                    <DropdownSelect className="group-select"
                                    data={groupList}
                                    valueField="id"
                                    displayField="name"
                                    value={filterGroup}
                                    onChange={value => {
                                        onFilterChange(filterValue, value, filterStatus);
                                    }}/>

                    <DropdownSelect className="group-select"
                                    data={statusList}
                                    valueField="id"
                                    displayField="name"
                                    value={filterStatus}
                                    onChange={value => {
                                        onFilterChange(filterValue, filterGroup, value);
                                    }}/>

                </div>

                <RaisedButton className="create-patient-button"
                              theme={RaisedButton.Theme.PRIMARY}
                              iconCls="icon-plus"
                              value="Create Patient"
                              onTouchTap={this.showAddPatient}/>

                <AddPatientDialog visible={addPatientDialogVisible}
                                  onRequestClose={this.hideAddPatient}/>

            </div>
        );
    }
}

PatientListFilter.propTypes = {

    filterValue: PropTypes.string,
    groupList: PropTypes.array,
    filterGroup: PropTypes.object,
    statusList: PropTypes.array,
    filterStatus: PropTypes.object,

    resetPatientBaseInfo: PropTypes.func,
    onFilterChange: PropTypes.func

};

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientListFilter);