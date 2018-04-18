import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions/index';

import Checkbox from 'customized/CustomizedMaterialCheckbox';
import RadioGroup from 'customized/CustomizedMaterialRadioGroup';
import TextField from 'customized/CustomizedMaterialTextField';
import TextArea from 'customized/CustomizedMaterialTextArea';
import DateTimePicker from 'customized/CustomizedMaterialDateTimePicker';
import FieldSet from 'components/FieldSet';
import DisplayField from 'components/DisplayField';

import Util from 'vendors/Util';
import Time from 'vendors/Time';

import 'scss/containers/app/modules/editPatient/observalData/ObservalForm.scss';

const format = Util.formatString;

class ObservalForm extends Component {

    constructor(props) {

        super(props);

        this.genderList = [{
            label: 'Male',
            value: 1
        }, {
            label: 'Female',
            value: 2
        }];

        this.updateField = ::this.updateField;

    }

    formatDuration(timeStamp, isBirthTime) {

        if (timeStamp < 0) {
            return '';
        }

        return isBirthTime ?
            `Duration of Analgesia: ${~~(timeStamp / 1000 / 60) + 60} min`
            :
            `Duration: ${~~(timeStamp / 1000 / 60)} min`;

    }

    updateField(fieldName, fieldValue) {

        const {updateObservalDataField} = this.props;
        updateObservalDataField(fieldName, fieldValue);

        setTimeout(() => {
            this.save();
        }, 0);

    }

    save = _.debounce(() => {
        const {patientId, createOrUpdateObservalData} = this.props;
        patientId && createOrUpdateObservalData(patientId, undefined, true, true);
    }, 250);

    render() {

        const {$form} = this.props,

            pcaDuration = this.formatDuration(Time.duration($form.initialTime, $form.firstPcaTime)),
            bolusDuration = this.formatDuration(Time.duration($form.initialTime, $form.firstManualBolusTime)),
            birthDuration = this.formatDuration(Time.duration($form.initialTime, $form.birthTime), true);

        return (
            <div className="observal-data-form">

                <FieldSet title="1. Basic Information">
                    <div className="row">
                        <DateTimePicker className="col-6"
                                        label="Initial Time"
                                        value={format($form.initialTime)}
                                        onChange={value => this.updateField('initialTime', value)}/>
                    </div>
                </FieldSet>

                <FieldSet title="2. Medication use">
                    <div className="row">
                        <TextField className="col-3 unit-ml"
                                   label="Test Dose"
                                   rightIconCls="unit"
                                   value={format($form.testDose)}
                                   onChange={value => this.updateField('testDose', value)}/>
                        <TextField className="col-3 unit-ml"
                                   label="Initial Dose"
                                   rightIconCls="unit"
                                   value={format($form.initialDose)}
                                   onChange={value => this.updateField('initialDose', value)}/>
                        <TextField className="col-3 unit-ml"
                                   label="Pump Consumption"
                                   rightIconCls="unit"
                                   value={format($form.pumpConsumption)}
                                   onChange={value => this.updateField('pumpConsumption', value)}/>
                        <TextField className="col-3 unit-ml"
                                   label="Bolus"
                                   rightIconCls="unit"
                                   value={format($form.bolus)}
                                   onChange={value => this.updateField('bolus', value)}/>
                    </div>
                    <div className="row">
                        <Checkbox className="col-3"
                                  label="Carbetocin"
                                  checked={$form.hasCarbetocin}
                                  onChange={value => this.updateField('hasCarbetocin', value)}/>
                        <Checkbox className="col-3"
                                  label="Hemabate"
                                  checked={$form.hasHemabate}
                                  onChange={value => this.updateField('hasHemabate', value)}/>
                    </div>
                </FieldSet>

                <FieldSet title="3. PCA">
                    <div className="row">
                        <DateTimePicker className="col-6"
                                        label="First PCA Time"
                                        value={format($form.firstPcaTime)}
                                        onChange={value => this.updateField('firstPcaTime', value)}/>
                        {
                            pcaDuration ?
                                <DisplayField className="col-6 duration-tag">
                                    {pcaDuration}
                                </DisplayField>
                                :
                                null
                        }
                    </div>
                    <div className="row">
                        <TextField className="col-6"
                                   label="PCA Count"
                                   value={format($form.pcaCount)}
                                   onChange={value => this.updateField('pcaCount', value)}/>
                    </div>
                </FieldSet>

                <FieldSet title="4. Bolus">
                    <div className="row">
                        <DateTimePicker className="col-6"
                                        label="First Manual Bolus Time"
                                        value={format($form.firstManualBolusTime)}
                                        onChange={value => this.updateField('firstManualBolusTime', value)}/>
                        {
                            bolusDuration ?
                                <DisplayField className="col-6 duration-tag">
                                    {bolusDuration}
                                </DisplayField>
                                :
                                null
                        }
                    </div>
                    <div className="row">
                        <TextField className="col-6"
                                   label="Manual Bolus Count"
                                   value={format($form.manualBolusCount)}
                                   onChange={value => this.updateField('manualBolusCount', value)}/>
                    </div>
                </FieldSet>

                <FieldSet title="5. Epidural Catheter">
                    <div className="row">
                        <Checkbox className="col-6"
                                  label="Epidural Catheter Adjuestment"
                                  checked={$form.hasEpiduralCatheterAdjuestment}
                                  onChange={value => this.updateField('hasEpiduralCatheterAdjuestment', value)}/>
                        <Checkbox className="col-6"
                                  label="Epidural Catheter Replacement"
                                  checked={$form.hasEpiduralcatheterReplacement}
                                  onChange={value => this.updateField('hasEpiduralcatheterReplacement', value)}/>
                    </div>
                </FieldSet>

                <FieldSet title="6. Labor">
                    <div className="row">
                        <TextField className="col-3 unit-hours"
                                   label="First Stage Of Labor"
                                   rightIconCls="unit"
                                   value={format($form.durationOfFirstStageOfLaborHours)}
                                   onChange={value => this.updateField('durationOfFirstStageOfLaborHours', value)}/>
                        <TextField className="col-3 unit-minutes"
                                   rightIconCls="unit"
                                   value={format($form.durationOfFirstStageOfLaborMinutes)}
                                   onChange={value => this.updateField('durationOfFirstStageOfLaborMinutes', value)}/>
                        <TextField className="col-3 unit-hours"
                                   label="Second Stage Of Labor"
                                   rightIconCls="unit"
                                   value={format($form.durationOfSecondStageOfLaborHours)}
                                   onChange={value => this.updateField('durationOfSecondStageOfLaborHours', value)}/>
                        <TextField className="col-3 unit-minutes"
                                   rightIconCls="unit"
                                   value={format($form.durationOfSecondStageOfLaborMinutes)}
                                   onChange={value => this.updateField('durationOfSecondStageOfLaborMinutes', value)}/>
                    </div>
                    <div className="row">
                        <TextField className="col-6"
                                   label="Blood Lose"
                                   value={format($form.bloodLose)}
                                   onChange={value => this.updateField('bloodLose', value)}/>
                        <TextField className="col-6"
                                   label="Patient Satisfaction Score"
                                   value={format($form.patientSatisfactionScore)}
                                   onChange={value => this.updateField('patientSatisfactionScore', value)}/>
                    </div>
                    <div className="row">
                        <Checkbox className="col-3"
                                  label="Prenatal Fever"
                                  checked={$form.hasPrenatalFever}
                                  onChange={value => this.updateField('hasPrenatalFever', value)}/>
                        <Checkbox className="col-3"
                                  label="Vasoactive Agent"
                                  checked={$form.hasVasoactiveAgent}
                                  onChange={value => this.updateField('hasVasoactiveAgent', value)}/>
                        <Checkbox className="col-3"
                                  label="Nausea"
                                  checked={$form.hasNausea}
                                  onChange={value => this.updateField('hasNausea', value)}/>
                        <Checkbox className="col-3"
                                  label="Vomit"
                                  checked={$form.hasVomit}
                                  onChange={value => this.updateField('hasVomit', value)}/>
                    </div>
                    <div className="row">
                        <Checkbox className="col-3"
                                  label="Pruritus"
                                  checked={$form.hasPruritus}
                                  onChange={value => this.updateField('hasPruritus', value)}/>
                        <Checkbox className="col-3"
                                  label="Hypotension"
                                  checked={$form.hasHypotension}
                                  onChange={value => this.updateField('hasHypotension', value)}/>
                        <Checkbox className="col-6"
                                  label="Unabled To Puncture Dura"
                                  checked={$form.isUnabledToPunctureDura}
                                  onChange={value => this.updateField('isUnabledToPunctureDura', value)}/>
                    </div>
                    <div className="row">
                        <Checkbox className="col-3"
                                  label="Caesarean Section"
                                  checked={$form.hasCaesareanSection}
                                  onChange={value => this.updateField('hasCaesareanSection', value)}/>
                        <Checkbox className="col-3"
                                  label="Instrumental"
                                  checked={$form.hasInstrumental}
                                  onChange={value => this.updateField('hasInstrumental', value)}/>
                        <Checkbox className="col-6"
                                  label="Postdural Puncture Headache"
                                  checked={$form.hasPostduralPunctureHeadache}
                                  onChange={value => this.updateField('hasPostduralPunctureHeadache', value)}/>
                    </div>
                    <div className="row">
                        <Checkbox className="col-3"
                                  label="Back Pain"
                                  checked={$form.hasBackPain}
                                  onChange={value => this.updateField('hasBackPain', value)}/>
                        <Checkbox className="col-3"
                                  label="Paresthesia"
                                  checked={$form.hasParesthesia}
                                  onChange={value => this.updateField('hasParesthesia', value)}/>
                        <Checkbox className="col-6"
                                  label="Accidental Dural Punture"
                                  checked={$form.hasAccidentalDuralPunture}
                                  onChange={value => this.updateField('hasAccidentalDuralPunture', value)}/>
                    </div>
                    <div className="row">
                        <Checkbox className="col-6"
                                  label="IV Epidural Catheter Insertion"
                                  checked={$form.isIVEpiduralCatheterInsertion}
                                  onChange={value => this.updateField('isIVEpiduralCatheterInsertion', value)}/>
                        <Checkbox className="col-6"
                                  label="Intrathecal Epidural Catheter Insertion"
                                  checked={$form.isIntrathecalEpiduralCatheterInsertion}
                                  onChange={value => this.updateField('isIntrathecalEpiduralCatheterInsertion', value)}/>
                    </div>
                </FieldSet>

                <FieldSet title="7. Lateral Episiotomy">
                    <div className="row">
                        <Checkbox className="col-3"
                                  label="Lateral Episiotomy"
                                  checked={$form.hasLateralEpisiotomy}
                                  onChange={value => this.updateField('hasLateralEpisiotomy', value)}/>
                        <TextField className="col-6"
                                   label="Lateral Episiotomy VAS Score"
                                   value={format($form.lateralEpisiotomyVasScore)}
                                   disabled={!$form.hasLateralEpisiotomy}
                                   onChange={value => this.updateField('lateralEpisiotomyVasScore', value)}/>
                    </div>
                </FieldSet>

                <FieldSet title="8. NICU">
                    <div className="row">
                        <Checkbox className="col-3"
                                  label="NICU"
                                  checked={$form.hasNicu}
                                  onChange={value => this.updateField('hasNicu', value)}/>
                        <TextArea className="col-9"
                                  label="NICU Reason"
                                  value={format($form.nicuReason)}
                                  disabled={!$form.hasNicu}
                                  onChange={value => this.updateField('nicuReason', value)}/>
                    </div>
                </FieldSet>

                <FieldSet title="9. Foetal">
                    <div className="row">
                        <RadioGroup className="col-3"
                                    label="Foetal Gender"
                                    name="foetalGender"
                                    data={this.genderList}
                                    value={format($form.foetalGender)}
                                    onChange={value => this.updateField('foetalGender', value)}/>
                        <DateTimePicker className="col-3"
                                        label="Birth Time"
                                        value={format($form.birthTime)}
                                        onChange={value => this.updateField('birthTime', value)}/>
                        {
                            birthDuration ?
                                <DisplayField className="col-6 duration-tag">
                                    {birthDuration}
                                </DisplayField>
                                :
                                null
                        }
                    </div>
                    <div className="row">
                        <TextField className="col-3 unit-cm"
                                   label="Foetal Height"
                                   rightIconCls="unit"
                                   value={format($form.foetalHeight)}
                                   onChange={value => this.updateField('foetalHeight', value)}/>
                        <TextField className="col-3 unit-g"
                                   label="Foetal Weight"
                                   rightIconCls="unit"
                                   value={format($form.foetalWeight)}
                                   onChange={value => this.updateField('foetalWeight', value)}/>
                        <TextField className="col-3"
                                   label="1min Apgar Score"
                                   value={format($form.oneMinuteApgarScore)}
                                   onChange={value => this.updateField('oneMinuteApgarScore', value)}/>
                        <TextField className="col-3"
                                   label="5min Apgar Score"
                                   value={format($form.fiveMinuteApgarScore)}
                                   onChange={value => this.updateField('fiveMinuteApgarScore', value)}/>
                    </div>
                    <div className="row">
                        <TextField className="col-3"
                                   label="Arterial PH"
                                   value={format($form.arterialPh)}
                                   onChange={value => this.updateField('arterialPh', value)}/>
                        <TextField className="col-3"
                                   label="Arterial BE"
                                   value={format($form.arterialBe)}
                                   onChange={value => this.updateField('arterialBe', value)}/>
                        <TextField className="col-3"
                                   label="Venous PH"
                                   value={format($form.venousPh)}
                                   onChange={value => this.updateField('venousPh', value)}/>
                        <TextField className="col-3"
                                   label="Venous BE"
                                   value={format($form.venousBe)}
                                   onChange={value => this.updateField('venousBe', value)}/>
                    </div>
                </FieldSet>

                <FieldSet title="10. Others">
                    <div className="row">
                        <TextArea className="col-12"
                                  label="Description"
                                  maxLength={1000}
                                  wordCountVisible={true}
                                  value={format($form.description)}
                                  onChange={value => this.updateField('description', value)}/>
                    </div>
                </FieldSet>

            </div>
        );
    }
}

ObservalForm.propTypes = {

    patientId: PropTypes.string,
    $form: PropTypes.object,

    updateObservalDataField: PropTypes.func,
    createOrUpdateObservalData: PropTypes.func

};

export default connect(state => ({
    $form: state.observal.form
}), dispatch => bindActionCreators(actions, dispatch))(ObservalForm);