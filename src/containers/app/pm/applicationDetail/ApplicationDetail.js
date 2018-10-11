import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Pop from 'alcedo-ui/_PositionPop';
import Loading from 'alcedo-ui/CircularLoading';
import IconButton from 'alcedo-ui/IconButton';
import Form from '../common/ApplicationForm';

import 'scss/containers/app/pm/applicationDetail/ApplicationDetail.scss';

class ApplicationDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data, match} = this.props,
            application = data && data.find(item => item && item.name === match.params.name);

        return (
            <Pop className="application-detail"
                 visible={true}>

                {
                    !application ?
                        <Loading/>
                        :
                        <Form data={application}/>
                }

                <IconButton className="icon-chevron-thin-left back-icon"/>

            </Pop>
        );

    }
}

ApplicationDetail.propTypes = {
    data: PropTypes.array
};

export default connect(state => ({
    data: state.applications.data
}), dispatch => bindActionCreators({}, dispatch))(ApplicationDetail);
