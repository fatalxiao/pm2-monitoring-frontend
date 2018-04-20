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

        this.state = {
            data: []
        };

        this.nameTouchTapHandler = ::this.nameTouchTapHandler;

    }

    nameTouchTapHandler(process) {
        this.props.$routerPush(`/process/${process.pm_id}`);
    }

    shouldComponentUpdate(nextProps, nextState) {

        const {data} = this.state,
            {data: nextData} = nextState;

        if (data.length !== nextData.length) {
            return true;
        }

        for (let process of data) {

            const nextProcess = nextData.find(p => p.name === process.name);

            if (
                // pm id
                process.pm_id !== nextProcess.pm_id

                // pid
                || process.pid !== nextProcess.pid

                // monit
                || (!process.monit && nextProcess.monit) || (process.monit && !nextProcess.monit)
                || (process.monit && nextProcess.monit
                && (process.monit.cpu !== nextProcess.monit.cpu
                    || process.monit.memory !== nextProcess.monit.memory))

                // env
                || (!process.pm2_env && nextProcess.pm2_env) || (process.pm2_env && !nextProcess.pm2_env)
                || (process.pm2_env && nextProcess.pm2_env
                && (process.pm2_env.status !== nextProcess.pm2_env.status
                    || process.pm2_env.restart_time !== nextProcess.pm2_env.restart_time))

            ) {
                return true;
            }

        }

        return false;

    }

    static getDerivedStateFromProps(nextProps) {

        const {$monitoringData, $processes} = nextProps;

        if (!$processes || $processes.length < 1) {
            return {
                data: []
            };
        }

        if (!$monitoringData || !$monitoringData.processes || $monitoringData.processes.length < 1) {
            return {
                data: $processes
            };
        }

        return {
            data: $processes.map(item => $monitoringData.processes.find(p => p.name === item.name))
        };

    }

    render() {

        const {data} = this.state;

        console.log(data);

        return (
            <Table className="processes"
                   data={data}
                   columns={[{
                       header: 'Name',
                       renderer: rowData =>
                           rowData.pm_id ?
                               <a href="javascript:void(0)"
                                  onTouchTap={() => this.nameTouchTapHandler(rowData)}>
                                   {rowData.name}
                               </a>
                               :
                               <a>
                                   {rowData.name}
                               </a>
                   }, {
                       header: 'ID',
                       renderer: 'pm_id'
                   }, {
                       header: 'PID',
                       renderer: 'pid'
                   }, {
                       header: 'Status',
                       renderer: rowData => rowData.pm2_env ? rowData.pm2_env.status : ''
                   }, {
                       header: 'CPU',
                       renderer: rowData => rowData.monit ? `${rowData.monit.cpu}%` : '0%'
                   }, {
                       header: 'MEM',
                       renderer: rowData => rowData.monit ? `${(rowData.monit.memory / 1000000).toFixed(1)} MB` : '0 MB'
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