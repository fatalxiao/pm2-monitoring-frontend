import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import PatientListFilter from './PatientListFilter';
import PatientListTable from './PatientListTable';
import NavNoPatient from 'containers/app/nav/patients/NavNoPatient';

import 'scss/containers/app/modules/patientList/PatientList.scss';

class PatientList extends Component {

    constructor(props) {

        super(props);

        this.allGroup = {id: 0, name: 'All Groups'};
        this.allStatus = {id: -1, name: 'All Status'};

        this.statusList = [this.allStatus, {
            id: 1, name: 'Enabled'
        }, {
            id: 0, name: 'Disabled'
        }];

        this.state = {
            filterValue: '',
            filterGroup: this.allGroup,
            filterStatus: this.allStatus
        };

        this.filterChangeHandler = ::this.filterChangeHandler;

    }

    filterChangeHandler(filterValue, filterGroup, filterStatus) {
        this.setState({
            filterValue,
            filterGroup,
            filterStatus
        });
    }

    filterData() {

        const {$patientList} = this.props,
            {filterValue, filterGroup, filterStatus} = this.state;

        return $patientList.filter(item =>
            (item.id.includes(filterValue) || item.name.includes(filterValue))
            &&
            (filterGroup.id === 0 ? true : item.groupId === filterGroup.id)
            &&
            (filterStatus.id === -1 ? true : item.status === filterStatus.id)
        );

    }

    render() {

        const {$groupList, $patientList} = this.props,
            {filterValue, filterGroup, filterStatus} = this.state;

        return (
            <div className="patient-list">
                {
                    $patientList && $patientList.length > 0 ?
                        <div>
                            <PatientListFilter filterValue={filterValue}
                                               groupList={[this.allGroup, ...$groupList]}
                                               filterGroup={filterGroup}
                                               statusList={this.statusList}
                                               filterStatus={filterStatus}
                                               onFilterChange={this.filterChangeHandler}/>
                            <PatientListTable data={this.filterData()}/>
                        </div>
                        :
                        <NavNoPatient/>
                }
            </div>
        );
    }
}

PatientList.propTypes = {
    $groupList: PropTypes.array,
    $patientList: PropTypes.array
};

function mapStateToProps(state, ownProps) {
    return {
        $groupList: state.group.list,
        $patientList: state.patients.list
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);