import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import Util from 'vendors/Util';

import 'scss/containers/app/nav/create/CreateButton.scss';

class CreateButton extends Component {

    constructor(props) {

        super(props);

        this.defaultSize = 56;

        this.state = {
            avtivated: false,
            size: this.defaultSize
        };

    }

    toggle = () => {

        if (this.state.avtivated || !this.buttonEl) {
            return;
        }

        const pointer = Util.getElCenterPoint(this.buttonEl);

        if (!pointer) {
            return;
        }

        const {x, y} = pointer,
            windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;

        this.setState({
            avtivated: true,
            size: Util.getDiag(windowWidth, windowHeight)
        });

    };

    componentDidMount() {
        this.buttonEl = this.refs.button;
    }

    render() {

        const {avtivated, size} = this.state,

            className = classNames('create-button', {
                avtivated
            }),
            style = {
                width: size,
                height: size
            };

        return (
            <div ref="button"
                 className={className}
                 style={style}
                 onClick={this.toggle}>

            </div>
        );
    }
}

CreateButton.propTypes = {};

export default connect(state => ({}), dispatch => bindActionCreators({}, dispatch))(CreateButton);