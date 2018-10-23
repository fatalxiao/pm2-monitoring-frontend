import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import Button from 'alcedo-ui/RaisedButton';

import 'scss/containers/app/pm/application/ApplicationSetting.scss';

class ApplicationSetting extends Component {

    constructor(props) {
        super(props);
    }

    update = () => {

    };

    render() {

        const {data} = this.props;

        return (
            <div className="application-setting">

                <Button className="update-button"
                        theme={Button.Theme.HIGHLIGHT}
                        value="Update"
                        onClick={this.update}/>

            </div>
        );

    }
}

ApplicationSetting.propTypes = {
    data: PropTypes.object,
    restartApplication: PropTypes.func
};

export default connect(state => ({}), dispatch => bindActionCreators({
    restartApplication: actions.restartApplication
}, dispatch))(ApplicationSetting);
