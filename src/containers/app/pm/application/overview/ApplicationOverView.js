import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import Status from '../../common/ApplicationStatus';
import LineChart from '../../../../../components/LineChart';

import Calculation from 'vendors/Calaulation';

import 'scss/containers/app/pm/application/ApplicationOverview.scss';

class ApplicationOverView extends Component {

    constructor(props) {
        super(props);
    }

    getApplication = () => {
        const {match, applications} = this.props;
        return applications && applications.find(item => item && item.name === match.params.name);
    };

    formatData = type => {

        const application = this.getApplication();

        if (!application || !application.monitRecord) {
            return [];
        }

        return application.monitRecord.map(item => {

            if (!item) {
                return item;
            }

            const result = {
                name: item.time,
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

        const application = this.getApplication();

        if (!application) {
            return null;
        }

        const activated = application.status === 'online',

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
                        <Status value={application.status}/>
                    </div>
                </div>

                <div className="overview-item cpu">
                    <div className="overview-item-left">
                        <div className="overview-item-title">CPU</div>
                        <div className={cpuClassName}>
                            {
                                activated && application.monit ?
                                    Calculation.formatCPU(application.monit.cpu)
                                    :
                                    '--'
                            }
                            <span className="monit-unit">%</span>
                        </div>
                    </div>
                    <LineChart className="overview-item-chart"
                               data={this.formatData('cpu')}
                               color={['#2db7f5']}
                               unit="%"
                               config={{
                                   yAxis: {
                                       min: 0,
                                       max: 100
                                   }
                               }}/>
                </div>

                <div className="overview-item memory">
                    <div className="overview-item-left">
                        <div className="overview-item-title">Memory</div>
                        <div className={memoryClassName}>
                            {
                                activated && application.monit ?
                                    Calculation.formatMemory(application.monit.memory)
                                    :
                                    '--'
                            }
                            <span className="monit-unit">MB</span>
                        </div>
                    </div>
                    <LineChart className="overview-item-chart"
                               data={this.formatData('memory')}
                               color={['#908bc3']}
                               unit="MB"
                               config={{
                                   yAxis: {
                                       min: 0
                                   }
                               }}/>
                </div>

            </div>
        );

    }
}

ApplicationOverView.propTypes = {
    applications: PropTypes.array
};

export default connect(state => ({
    applications: state.applications.data
}), dispatch => bindActionCreators({}, dispatch))(ApplicationOverView);
