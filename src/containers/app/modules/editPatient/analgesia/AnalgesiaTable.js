import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import debounce from 'lodash/debounce';

import * as actions from 'reduxes/actions/index';

import Table from 'alcedo-ui/Table';
import Checkbox from 'alcedo-ui/Checkbox';
import TextField from 'customized/CustomizedMaterialTextField';
import DropdownSelect from 'customized/CustomizedMaterialDropdownSelect';

import Util from 'vendors/Util';

import 'scss/containers/app/modules/editPatient/analgesiaData/AnalgesiaTable.scss';

const format = Util.formatString;

class AnalgesiaTable extends Component {

    constructor(props) {

        super(props);

        this.updateField = ::this.updateField;
        this.save = ::this.save;

    }

    updateField(timePoint, fieldName, fieldValue) {

        const {updateAnalgesiaDataField} = this.props;
        updateAnalgesiaDataField(timePoint, fieldName, fieldValue);

        setTimeout(() => {
            this.save();
        }, 0);

    }

    save = debounce(() => {
        const {patientId, createOrUpdateAnalgesiaData} = this.props;
        patientId && createOrUpdateAnalgesiaData(patientId, undefined, true);
    }, 250);

    render() {

        const {$thoracicList, $sacralList, $analgesiaData} = this.props,
            self = this;

        return (
            <div className="analgesia-data-table-scroller">
                <Table className="analgesia-data-table"
                       columns={[{
                           header: 'Time',
                           renderer: rowData => rowData.timePoint <= 60 ?
                               `${rowData.timePoint} min`
                               :
                               `${rowData.timePoint / 60} h`
                       }, {
                           header: 'Contraction',
                           renderer: rowData =>
                               <Checkbox checked={rowData.hasContraction}
                                         onChange={value => self.updateField(rowData.timePoint, 'hasContraction', value)}/>
                       }, {
                           header: 'Vas',
                           renderer: rowData =>
                               <TextField value={format(rowData.vasScore)}
                                          onChange={value => self.updateField(rowData.timePoint, 'vasScore', value)}/>
                       }, {
                           header: 'TSB',
                           renderer: rowData =>
                               <div>
                                   <label>L: </label>
                                   <DropdownSelect data={$thoracicList}
                                                   value={rowData.thoracicSensoryBlockLeft}
                                                   valueField="value"
                                                   displayField="name"
                                                   onChange={value => self.updateField(rowData.timePoint, 'thoracicSensoryBlockLeft', value)}/>
                                   <label>, R: </label>
                                   <DropdownSelect data={$thoracicList}
                                                   value={rowData.thoracicSensoryBlockRight}
                                                   valueField="value"
                                                   displayField="name"
                                                   onChange={value => self.updateField(rowData.timePoint, 'thoracicSensoryBlockRight', value)}/>
                               </div>
                       }, {
                           header: 'SSB',
                           renderer: rowData =>
                               <div>
                                   <label>L: </label>
                                   <DropdownSelect data={$sacralList}
                                                   value={rowData.sacralSensoryBlockLeft}
                                                   valueField="value"
                                                   displayField="name"
                                                   onChange={value => self.updateField(rowData.timePoint, 'sacralSensoryBlockLeft', value)}/>
                                   <label>, R: </label>
                                   <DropdownSelect data={$sacralList}
                                                   value={rowData.sacralSensoryBlockRight}
                                                   valueField="value"
                                                   displayField="name"
                                                   onChange={value => self.updateField(rowData.timePoint, 'sacralSensoryBlockRight', value)}/>
                               </div>
                       }, {
                           header: 'Bromage',
                           renderer: rowData =>
                               <TextField value={format(rowData.bromageScore)}
                                          onChange={value => self.updateField(rowData.timePoint, 'bromageScore', value)}/>
                       }, {
                           header: 'SBP',
                           renderer: rowData =>
                               <TextField value={format(rowData.systolicBloodPressure)}
                                          onChange={value => self.updateField(rowData.timePoint, 'systolicBloodPressure', value)}/>
                       }, {
                           header: 'DBP',
                           renderer: rowData =>
                               <TextField value={format(rowData.diastolicBloodPressure)}
                                          onChange={value => self.updateField(rowData.timePoint, 'diastolicBloodPressure', value)}/>
                       }, {
                           header: 'Heart Rate',
                           renderer: rowData =>
                               <TextField value={format(rowData.heartRate)}
                                          onChange={value => self.updateField(rowData.timePoint, 'heartRate', value)}/>
                       }, {
                           header: 'SPO2',
                           renderer: rowData =>
                               <TextField value={format(rowData.pulseOxygenSaturation)}
                                          onChange={value => self.updateField(rowData.timePoint, 'pulseOxygenSaturation', value)}/>
                       }, {
                           header: 'FHR',
                           renderer: rowData =>
                               <TextField value={format(rowData.fetalHeartRate)}
                                          onChange={value => self.updateField(rowData.timePoint, 'fetalHeartRate', value)}/>
                       }]}
                       data={$analgesiaData}
                       isPagging={false}/>
            </div>
        );
    }
}

AnalgesiaTable.propTypes = {

    patientId: PropTypes.string,
    $thoracicList: PropTypes.array,
    $sacralList: PropTypes.array,
    $analgesiaData: PropTypes.array,

    updateAnalgesiaDataField: PropTypes.func,
    createOrUpdateAnalgesiaData: PropTypes.func

};

export default connect(state => ({
    $thoracicList: state.sensoryBlock.thoracicList,
    $sacralList: state.sensoryBlock.sacralList,
    $analgesiaData: state.analgesia.data
}), dispatch => bindActionCreators(actions, dispatch))(AnalgesiaTable);