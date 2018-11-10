import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ApplicationCols from './ApplicationCols';
import ApplicationCtrls from '../../../common/ApplicationCtrls';

class ApplicationCardTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props;

        return (
            <Fragment>
                <ApplicationCols data={data}/>
                <ApplicationCtrls data={data}/>
            </Fragment>
        );

    }
}

ApplicationCardTable.propTypes = {
    data: PropTypes.object
};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(ApplicationCardTable);
