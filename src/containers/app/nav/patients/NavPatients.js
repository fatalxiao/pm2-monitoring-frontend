import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

import CircularLoading from 'alcedo-ui/CircularLoading';

import NavPatientCollapsed from './NavPatientsPopover';
import NoPatient from './NavNoPatient';
import PatientListWrapper from './NavPatientListWrapper';

import 'scss/containers/app/nav/patients/NavPatient.scss';

class NavPatient extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {isCollapsed, isFold, $groupListActionType, $patientList, $patientListActionType} = this.props,

            hasNoPatient = !$patientList || $patientList.length < 1,
            wrapperClassName = (hasNoPatient ? ' no-patient' : '') + (isCollapsed ? ' collapsed' : '')
                + (isFold ? ' fold' : '');

        return (
            <div className={'nav-patient' + wrapperClassName}>

                {
                    $groupListActionType === actionTypes.GET_GROUPS_REQUEST
                    || $patientListActionType === actionTypes.GET_PATIENTS_REQUEST ?
                        <CircularLoading/>
                        :
                        (
                            isCollapsed ?
                                <NavPatientCollapsed isFold={isFold}/>
                                :
                                (
                                    hasNoPatient ?
                                        <NoPatient/>
                                        :
                                        <PatientListWrapper/>
                                )
                        )
                }

            </div>
        );
    }
}

NavPatient.propTypes = {

    isCollapsed: PropTypes.bool,
    isFold: PropTypes.bool,

    $groupListActionType: PropTypes.string,
    $patientList: PropTypes.array,
    $patientListActionType: PropTypes.string,

    routerPush: PropTypes.func

};

function mapStateToProps(state, ownProps) {
    return {
        $groupListActionType: state.group.actionType,
        $patientList: state.patients.list,
        $patientListActionType: state.patients.getActionType
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavPatient);