import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import IconButton from 'alcedo-ui/IconButton';

import Util from 'vendors/Util';

import 'scss/containers/app/nav/create/CreateButton.scss';

class CreateButton extends Component {

    constructor(props) {

        super(props);

        this.state = {
            avtivated: false
        };

    }

    toggle = () => {
        this.setState({
            avtivated: !this.state.avtivated
        });
    };

    componentDidMount() {
    }

    render() {

        const {avtivated} = this.state,

            className = classNames('create-button-wrapper', {
                avtivated
            });

        return (
            <div className={className}>

                <div className="create-button-bg"></div>

                <IconButton className="create-button"
                            iconCls="icon-plus"
                            onClick={this.toggle}/>

            </div>
        );
    }
}

CreateButton.propTypes = {};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(CreateButton);