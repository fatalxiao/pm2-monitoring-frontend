import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';
import * as actionTypes from 'reduxes/actionTypes';

import ModuleLoading from 'components/ModuleLoading';
import StepAction from 'components/StepAction';
import ObservalForm from './ObservalForm';

import 'scss/containers/app/modules/editPatient/observalData/ObservalData.scss';

class ObservalData extends Component {

    constructor(props) {

        super(props);

        this.patientId = null;

        this.loadData = ::this.loadData;
        this.prevStep = ::this.prevStep;
        this.save = ::this.save;

    }

    loadData(props = this.props) {

        const {match, getPatientInfo, getObservalData} = props;

        if (match && match.params && match.params.patientId) {

            this.patientId = match.params.patientId;

            getPatientInfo(this.patientId);
            getObservalData(this.patientId);

        } else {
            routerPush('/app/patient-list');
        }

    }

    prevStep() {
        const {routerPush} = this.props;
        routerPush(`/app/patient/analgesia/${this.patientId}`);
    }

    save() {
        const {createOrUpdateObservalData, routerPush} = this.props;
        createOrUpdateObservalData(this.patientId, () => {
            routerPush(`/app/patient-list`);
        });
    }

    componentDidMount() {

        const {updatePatientStep} = this.props;
        updatePatientStep(2);

        this.loadData();

    }

    render() {

        const {$getActionType} = this.props;

        return (
            <div className="observal-data">
                {
                    $getActionType !== actionTypes.GET_OBSERVAL_SUCCESS ?
                        <ModuleLoading/>
                        :
                        <div>
                            <ObservalForm patientId={this.patientId}/>
                            <StepAction isLast={true}
                                        onPrev={this.prevStep}
                                        onNext={this.save}/>
                        </div>
                }
            </div>
        );
    }
}

ObservalData.propTypes = {

    $getActionType: PropTypes.string,

    routerPush: PropTypes.func,
    updatePatientStep: PropTypes.func,
    getPatientInfo: PropTypes.func,
    getObservalData: PropTypes.func,
    createOrUpdateObservalData: PropTypes.func

};

export default connect(state => ({
    $getActionType: state.observal.getActionType
}), dispatch => bindActionCreators(actions, dispatch))(ObservalData);