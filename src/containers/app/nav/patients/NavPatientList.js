import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import FlatButton from 'alcedo-ui/FlatButton';

import Event from 'vendors/Event';

import 'scss/containers/app/nav/patients/NavPatientList.scss';

class NavPatientList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {$groupList, $patientList, data, routerPush} = this.props,
            listData = data || $patientList;

        return (
            <div className="nav-patient-list"
                 onWheel={e => {
                     Event.preventContainerScroll(e);
                 }}>

                {
                    listData && listData.map((patient, index) => {

                        const patientId = patient.id,
                            groupName = $groupList.find(item => item.id === patient.groupId).name;

                        return (
                            <FlatButton key={index}
                                        className="patient"
                                        onTouchTap={() => {
                                            routerPush(`/app/patient/info/${patientId}`);
                                        }}>

                                <div className="patient-info">
                                    <span className="patient-name">{patient.name}</span>
                                </div>

                                <div className="patient-desc">
                                    {`${patientId}  ·  ${groupName}`}
                                </div>

                            </FlatButton>
                        );

                    })
                }

            </div>
        );

    }
}

NavPatientList.propTypes = {

    $groupList: PropTypes.array,
    $patientList: PropTypes.array,
    data: PropTypes.array,

    routerPush: PropTypes.func

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

export default connect(mapStateToProps, mapDispatchToProps)(NavPatientList);