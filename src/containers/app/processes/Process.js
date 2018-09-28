import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import FlatButton from 'alcedo-ui/FlatButton';

import Calculation from 'vendors/Calaulation';

import 'scss/containers/app/processes/Process.scss';

class Process extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {style, data} = this.props,
            activated = 'pm_id' in data,
            processClassName = classNames('process', {
                activated
            });

        return (
            <div className={processClassName}
                 style={style}>

                <div className="process-name">{data.name}</div>

                <div className="process-monit">
                    <div className="process-monit-cpu">
                        {`CPU: ${activated && data.monit ? Calculation.formatCPU(data.monit.cpu) : '--'}`}
                    </div>
                    <div className="process-monit-memory">
                        {`Memory: ${activated && data.monit ? Calculation.formatMemory(data.monit.memory) : '--'}`}
                    </div>
                </div>

                <div className="process-actions">
                    <FlatButton className="process-action"
                                iconCls="icon-upload-to-cloud"/>
                    <FlatButton className="process-action"
                                iconCls={`icon-controller-${activated ? 'stop' : 'play'}`}/>
                    <FlatButton className="process-action"
                                iconCls="icon-cycle"/>
                </div>

            </div>
        );
    }
}

Process.propTypes = {
    style: PropTypes.object,
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(Process);
