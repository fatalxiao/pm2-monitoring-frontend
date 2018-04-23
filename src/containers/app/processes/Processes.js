import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import isEqual from 'lodash/isEqual';

import * as actions from 'reduxes/actions';

import Table from 'alcedo-ui/Table';
import UploadIcon from './actions/UploadIcon';

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
        this.props.routerPush(`/process/${process.pm_id}`);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.state.data, nextState.data);
    }

    static getDerivedStateFromProps(nextProps) {

        const {monitoringData, processes} = nextProps;

        if (!processes || processes.length < 1) {
            return {
                data: []
            };
        }

        if (!monitoringData || !monitoringData.processes || monitoringData.processes.length < 1) {
            return {
                data: processes
            };
        }

        return {
            data: processes.map(item => {

                const data = monitoringData.processes.find(p => p.name === item.name),
                    result = {
                        name: data ? data.name : item.name,
                        pm_id: data ? data.pm_id : '',
                        pid: data ? data.pid : ''
                    };

                if (data && data.pm2_env) {
                    result.status = data.pm2_env.status || '';
                }

                if (data && data.monit) {
                    result.cpu = data.monit.cpu || 0;
                    result.memory = data.monit.memory ? (data.monit.memory / 1000000).toFixed(1) : 0;
                }

                return result;

            })
        };

    }

    render() {

        const {data} = this.state;

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
                               rowData.name
                   }, {
                       header: 'ID',
                       renderer: 'pm_id'
                   }, {
                       header: 'PID',
                       renderer: 'pid'
                   }, {
                       header: 'Status',
                       renderer: rowData => rowData.status
                   }, {
                       header: 'CPU',
                       renderer: rowData => !isNaN(rowData.cpu) ? `${rowData.cpu}%` : ''
                   }, {
                       header: 'MEM',
                       renderer: rowData => !isNaN(rowData.memory) ? `${rowData.memory} MB` : ''
                   }, {
                       renderer: rowData =>
                           <Fragment>
                               <UploadIcon data={rowData}/>
                           </Fragment>
                   }]}
                   idProp="name"/>
        );
    }
}

Processes.propTypes = {

    monitoringData: PropTypes.object,
    processes: PropTypes.array,

    routerPush: PropTypes.func

};

export default connect(state => ({
    monitoringData: state.monitoring.data,
    processes: state.processes.list
}), dispatch => bindActionCreators({
    routerPush: actions.routerPush
}, dispatch))(Processes);