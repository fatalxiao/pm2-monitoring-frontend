import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions/index';

import Dialog from 'alcedo-ui/Dialog';
import TextField from 'customized/CustomizedMaterialTextField';
import DropdownSelect from 'customized/CustomizedMaterialDropdownSelect';
import FieldSet from 'components/FieldSet';
import Msg from 'components/Msg';

import Util from 'vendors/Util';

import 'scss/containers/app/nav/bar/AddPatientDialog.scss';

const format = Util.formatString;

class AddPatientDialog extends Component {

    constructor(props) {

        super(props);

        this.state = {
            errorMsg: ''
        };

        this.updateField = ::this.updateField;
        this.save = ::this.save;

    }

    updateField(fieldName, fieldValue) {

        this.state.errorMsg && this.setState({
            errorMsg: ''
        });

        const {updatePatientBaseInfoField} = this.props;
        updatePatientBaseInfoField(fieldName, fieldValue);

    }

    save() {

        const {$form, createPatient, onRequestClose, routerPush} = this.props,
            error = [];

        if (!$form.id) {
            error.push('ID');
        }
        if (!$form.name) {
            error.push('Name');
        }
        if (!$form.group) {
            error.push('Group');
        }

        if (error.length > 0) {
            this.setState({
                errorMsg: `${error.join(', ')} is required!`
            });
            return;
        }

        createPatient(() => {
            onRequestClose();
            routerPush(`/app/patient/info/${$form.id}`);
        });

    }

    render() {

        const {$groupList, $form, visible, onRequestClose} = this.props,
            {errorMsg} = this.state;

        return (
            <Dialog className="add-patient-dialog"
                    visible={visible}
                    title="Create Patient"
                    okButtonText="Create"
                    onOKButtonTouchTap={this.save}
                    onRequestClose={onRequestClose}>

                <FieldSet title="1. Patient Basic Information">
                    <div className="row">
                        <TextField className="col-6"
                                   label="ID"
                                   value={format($form.id)}
                                   required={true}
                                   onChange={value => this.updateField('id', value)}/>
                        <TextField className="col-6"
                                   label="Name"
                                   value={format($form.name)}
                                   required={true}
                                   onChange={value => this.updateField('name', value)}/>
                    </div>
                </FieldSet>

                <FieldSet title="2. Select Patient Group">
                    <div className="row">
                        <DropdownSelect className="col-12"
                                        label="Group"
                                        data={$groupList}
                                        valueField="id"
                                        displayField="name"
                                        value={$form.group}
                                        required={true}
                                        onChange={value => this.updateField('group', value)}/>
                    </div>
                </FieldSet>

                {
                    errorMsg ?
                        <Msg type={Msg.Type.ERROR}>
                            {errorMsg}
                        </Msg>
                        :
                        null
                }

            </Dialog>
        );

    }
}

AddPatientDialog.propTypes = {

    $groupList: PropTypes.array,
    $form: PropTypes.object,

    visible: PropTypes.bool,

    onRequestClose: PropTypes.func,
    updatePatientBaseInfoField: PropTypes.func,
    createPatient: PropTypes.func,
    routerPush: PropTypes.func

};

function mapStateToProps(state, ownProps) {
    return {
        $groupList: state.group.list,
        $form: state.patientBaseInfo.form
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPatientDialog);