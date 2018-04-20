import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import Table from 'alcedo-ui/Table';

import 'scss/containers/app/processes/Processes.scss';

class Processes extends Component {

    constructor(props) {

        super(props);

        this.formatData = ::this.formatData;
        this.nameTouchTapHandler = ::this.nameTouchTapHandler;

    }

    formatData() {

        const {$monitoringData, $processes} = this.props;

        if (!$processes || $processes.length < 1) {
            return [];
        }

        if (!$monitoringData || !$monitoringData.processes || !$monitoringData.processes.length < 1) {
            return $processes;
        }

        return $processes.map(item => $monitoringData.processes.find(p => p.name === item.name));

    }

    nameTouchTapHandler(process) {
        this.props.$routerPush(`/process/${process.pm_id}`);
    }

    render() {
        return (
            <Table className="processes"
                   data={this.formatData()}
                   columns={[{
                       header: 'Name',
                       renderer: rowData =>
                           rowData.pm_id ?
                               <a href="javascript:void(0)"
                                  onTouchTap={() => this.nameTouchTapHandler(rowData)}>
                                   {rowData.name}
                               </a>
                               :
                               rowData.name
                   }]}/>
        );
    }
}

Processes.propTypes = {

    $monitoringData: PropTypes.object,
    $processes: PropTypes.array,

    $routerPush: PropTypes.func

};

export default connect(state => ({
    $monitoringData: state.monitoring.data,
    $processes: state.processes.list
}), dispatch => bindActionCreators({
    $routerPush: actions.routerPush
}, dispatch))(Processes);