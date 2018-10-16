import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import Status from '../common/ApplicationStatus';
import LineChart from '../common/LineChart';

import Calculation from 'vendors/Calaulation';

import 'scss/containers/app/pm/applicationDetail/ApplicationOverView.scss';

class ApplicationOverView extends Component {

    constructor(props) {
        super(props);
    }

    formatData = type => {

        const {data} = this.props;

        if (!data || !data.monitRecord) {
            return [];
        }

        return data.monitRecord.map(item => {

            if (!item) {
                return item;
            }

            const result = {
                name: '' + item.time,
                value: [
                    item.time
                ]
            };

            if (item.status === 'online' && item[type] !== null) {
                result.value.push(Calculation.format(type, item[type]));
            }

            return result;

        });

    };

    render() {

        const {data} = this.props,
            activated = data && data.status === 'online',

            cpuClassName = classNames('overview-item-content', 'cpu', {
                activated
            }),
            memoryClassName = classNames('overview-item-content', 'memory', {
                activated
            });

        return (
            <div className="application-overview">

                <div className="overview-item status">
                    <div className="overview-item-left">
                        <div className="overview-item-title">Status</div>
                        <Status value={data.status}/>
                    </div>
                </div>

                <div className="overview-item cpu">
                    <div className="overview-item-left">
                        <div className="overview-item-title">CPU</div>
                        <div className={cpuClassName}>
                            {
                                activated && data.monit ?
                                    Calculation.formatCPU(data.monit.cpu)
                                    :
                                    '--'
                            }
                            <span className="monit-unit">%</span>
                        </div>
                    </div>
                    <LineChart className="overview-item-chart"
                               data={this.formatData('cpu')}
                               color={['#2db7f5']}/>
                </div>

                <div className="overview-item memory">
                    <div className="overview-item-left">
                        <div className="overview-item-title">Memory</div>
                        <div className={memoryClassName}>
                            {
                                activated && data.monit ?
                                    Calculation.formatMemory(data.monit.memory)
                                    :
                                    '--'
                            }
                            <span className="monit-unit">MB</span>
                        </div>
                    </div>
                    <LineChart className="overview-item-chart"
                               data={this.formatData('memory')}
                               color={['#908bc3']}/>
                </div>

            </div>
        );

    }
}

ApplicationOverView.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationOverView);
