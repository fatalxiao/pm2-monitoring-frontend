import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Dialog from 'alcedo-ui/Dialog';

import 'scss/containers/app/pm/applicationDetail/ApplicationDetail.scss';

class ApplicationDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props;

        return (
            <Dialog className="application-detail"
                    visible={true}>

            </Dialog>
        );

    }
}

ApplicationDetail.propTypes = {
    data: PropTypes.array
};

export default connect(state => ({
    data: state.applications.data
}), dispatch => bindActionCreators({}, dispatch))(ApplicationDetail);
