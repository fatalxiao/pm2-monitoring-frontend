import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import SolidGaugeChart from 'components/SolidGaugeChart';
import CircularChart from 'components/CircularChart';

import 'scss/containers/app/modules/dashboard/Dashboard.scss';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    getGroupData(patientList) {

        if (!patientList || patientList.length < 1) {
            return [];
        }

        const data = {};

        for (let item of patientList) {

            if (!item.group) {
                continue;
            }

            if (item.group.name in data) {
                data[item.group.name]++;
            } else {
                data[item.group.name] = 1;
            }

        }

        const result = [];
        for (let groupName in data) {
            result.push([groupName, data[groupName]]);
        }

        return result;

    }

    render() {

        const {$patientList} = this.props;

        return (
            <div className="dpe-dashboard">

                <div className="row">
                    <SolidGaugeChart className="col-4 chart"
                                     title="Patients"
                                     value={$patientList.length}
                                     total={120}/>
                    <CircularChart className="col-4 chart"
                                   title="Group"
                                   data={this.getGroupData($patientList)}/>
                </div>

            </div>
        );
    }
}

Dashboard.propTypes = {
    $patientList: PropTypes.array
};

export default connect(state => ({
    $patientList: state.patients.list
}), dispatch => bindActionCreators(actions, dispatch))(Dashboard);