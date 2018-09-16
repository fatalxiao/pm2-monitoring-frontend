import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import 'scss/containers/app/processes/Process.scss';

class Process extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props,
            activated = 'pm_id' in data,
            processClassName = classNames('col-lg-3 col-md-6 col-sm-6 col-xs-12 process', {
                activated
            });

        return (
            <div className={processClassName}>

                <div className="process-name">{data.name}</div>

                {
                    activated ?
                        <div className="process-monit">
                            <div className="process-monit-cpu">
                                {`CPU: ${data.monit ? data.monit.cpu : 0}`}
                            </div>
                            <div className="process-monit-memory">
                                {`Memory: ${data.monit ? data.monit.memory : 0}`}
                            </div>
                        </div>
                        :
                        null
                }

            </div>
        );
    }
}

Process.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(Process);