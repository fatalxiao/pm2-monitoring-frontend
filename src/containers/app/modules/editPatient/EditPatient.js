import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {renderRoutes} from 'react-router-config';
import {Redirect} from 'react-router-dom';

import * as actions from 'reduxes/actions/index';

import PointStep from 'alcedo-ui/PointStep';

import 'scss/containers/app/modules/editPatient/EditPatient.scss';

class EditPatient extends Component {

    constructor(props) {

        super(props);

        this.stepChangeHandler = ::this.stepChangeHandler;

    }

    stepChangeHandler({activatedStep}) {
        const {$steps, routerPush} = this.props;
        routerPush($steps[activatedStep].route);
    }

    render() {

        const {route, $form, $steps, $activatedStep} = this.props;

        return (
            <div className="patient">

                <PointStep className="patient-stepper"
                           steps={$steps}
                           activatedStep={$activatedStep}
                           finishedStep={$steps.length - 1}
                           onChange={this.stepChangeHandler}/>

                <div className="patient-content">

                    {
                        $form && $form.name ?
                            <div>
                                <div className="patient-base-info">
                                    <h1 className="patient-name">{$form.name}</h1>
                                    <div className="patient-desc">
                                        {`${$form.id}  ·  ${$form.group && $form.group.name}`}
                                    </div>
                                </div>
                                {
                                    $activatedStep >= 0 ?
                                        <h2 className="patient-content-title">
                                            {`Step ${$activatedStep + 1}. ${$steps[$activatedStep].title}`}
                                        </h2>
                                        :
                                        null
                                }
                            </div>
                            :
                            null
                    }

                    {renderRoutes(route.routes)}

                    {
                        location.pathname === '/app/patient' ?
                            <Redirect from="/app/patient"
                                      to="/app/patient-list"/>
                            :
                            null
                    }

                </div>

            </div>
        );
    }
}

EditPatient.propTypes = {

    $form: PropTypes.object,
    $steps: PropTypes.array,

    $activatedStep: PropTypes.number,

    routerPush: PropTypes.func

};

export default connect(state => ({
    $form: state.patientInfo.form,
    $steps: state.editPatient.steps,
    $activatedStep: state.editPatient.activatedStep
}), dispatch => bindActionCreators(actions, dispatch))(EditPatient);