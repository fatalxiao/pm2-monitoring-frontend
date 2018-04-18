import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import debounce from 'lodash/debounce';

import * as actions from 'reduxes/actions';

import Table from 'alcedo-ui/Table';
import Switcher from 'alcedo-ui/Switcher';
import DropdownSelect from 'customized/CustomizedMaterialDropdownSelect';
import TextField from 'customized/CustomizedMaterialTextField';

import 'scss/containers/app/modules/patientList/PatientListTable.scss';

class PatientListTable extends Component {

    constructor(props) {

        super(props);

        this.nameChangeHandler = ::this.nameChangeHandler;
        this.groupChangeHandler = ::this.groupChangeHandler;
        this.statusChangeHandler = ::this.statusChangeHandler;

    }

    nameChangeHandler = debounce((id, value) => {
        this.props.updatePatientName(id, value);
    }, 250);

    groupChangeHandler(id, value) {
        this.props.updatePatientGroup(id, value);
    }

    statusChangeHandler(id, value) {
        const {enablePatient, disablePatient} = this.props;
        value ? enablePatient(id) : disablePatient(id);
    }

    render() {

        const {$groupList, data} = this.props,
            self = this;

        return data && data.length > 0 ?
            <Table className="patient-list-table"
                   data={data}
                   columns={[{
                       header: 'ID',
                       sortable: true,
                       sortProp: 'id',
                       renderer: rowData =>
                           <NavLink className="id-link"
                                    to={`/app/patient/info/${rowData.id}`}>
                               {rowData.id}
                           </NavLink>
                   }, {
                       header: 'Name',
                       sortable: true,
                       sortProp: 'name',
                       renderer(rowData) {
                           return <TextField className="hover-activated name-field"
                                             value={rowData.name}
                                             onChange={value => {
                                                 self.nameChangeHandler(rowData.id, value);
                                             }}/>;
                       }
                   }, {
                       header: 'Group',
                       sortable: true,
                       sortProp: 'groupId',
                       renderer(rowData) {
                           return <DropdownSelect className="hover-activated group-select"
                                                  data={$groupList}
                                                  valueField="id"
                                                  displayField="name"
                                                  value={rowData.group}
                                                  onChange={value => {
                                                      self.groupChangeHandler(rowData.id, value);
                                                  }}/>;
                       }
                   }, {
                       header: 'Status',
                       sortable: true,
                       sortProp: 'status',
                       renderer(rowData) {
                           return <Switcher value={rowData.status === 1}
                                            size={Switcher.Size.SMALL}
                                            onChange={value => {
                                                self.statusChangeHandler(rowData.id, value);
                                            }}/>;
                       }
                   }]}/>
            :
            <div className="no-patient-found">
                No Patient Found
            </div>;
    }
}

PatientListTable.propTypes = {

    $groupList: PropTypes.array,
    data: PropTypes.array,

    updatePatientName: PropTypes.func,
    updatePatientGroup: PropTypes.func,
    enablePatient: PropTypes.func,
    disablePatient: PropTypes.func

};

export default connect(state => ({
    $groupList: state.group.list
}), dispatch => bindActionCreators(actions, dispatch))(PatientListTable);