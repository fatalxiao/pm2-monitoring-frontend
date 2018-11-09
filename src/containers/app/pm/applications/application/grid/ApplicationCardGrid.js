import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ApplicationInfo from './grid/ApplicationInfo';
import ApplicationCtrls from '../../common/ApplicationCtrls';

class ApplicationCardGrid extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props;

        return (
            <Fragment>
                <ApplicationInfo data={data}/>
                <ApplicationCtrls data={data}/>
            </Fragment>
        );

    }
}

ApplicationCardGrid.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationCardGrid);
