import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

import ModuleLoading from 'components/ModuleLoading';
import PatientForm from './PatientForm';
import StepAction from 'components/StepAction';

import 'scss/containers/app/modules/editPatient/patientInfo/PatientInfo.scss';

class PatientInfo extends Component {

    constructor(props) {

        super(props);

        this.patientId = null;

        this.loadData = ::this.loadData;
        this.save = ::this.save;

    }

    loadData(props = this.props) {

        const {match, getPatientInfo} = props;

        if (match && match.params && match.params.id) {

            this.patientId = match.params.id;

            getPatientInfo(this.patientId);

        } else {
            routerPush('/app/patient-list');
        }

    }

    save() {
        const {updatePatientInfo, routerPush} = this.props;
        updatePatientInfo(this.patientId, () => {
            routerPush(`/app/patient/analgesia/${this.patientId}`);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match && nextProps.match.params
            && this.props.match && this.props.match.params
            && nextProps.match.params.id !== this.props.match.params.id) {
            this.loadData(nextProps);
        }
    }

    componentWillMount() {

        const {updatePatientStep} = this.props;
        updatePatientStep(0);

        this.loadData();

    }

    render() {

        const {$getActionType} = this.props;

        return (
            <div className="patient-info">
                {
                    $getActionType !== actionTypes.GET_PATIENT_INFO_SUCCESS ?
                        <ModuleLoading/>
                        :
                        <div>
                            <PatientForm patientId={this.patientId}/>
                            <StepAction isFirst={true}
                                        onNext={this.save}/>
                        </div>
                }
            </div>
        );

    }
}

PatientInfo.propTypes = {

    $getActionType: PropTypes.string,

    routerPush: PropTypes.func,
    updatePatientStep: PropTypes.func,
    getPatientInfo: PropTypes.func,
    updatePatientInfo: PropTypes.func

};

function mapStateToProps(state, ownProps) {
    return {
        $getActionType: state.patientInfo.getActionType
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientInfo);