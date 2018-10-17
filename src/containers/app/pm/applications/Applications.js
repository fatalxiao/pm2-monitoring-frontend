import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import debounce from 'lodash/debounce';
import eventsOn from 'dom-helpers/events/on';
import eventsOff from 'dom-helpers/events/off';

import Application from './application/ApplicationCard';

import 'scss/containers/app/pm/applications/Applications.scss';

class Applications extends Component {

    constructor(props) {

        super(props);

        this.applicationMinWidth = 280;
        this.applicationHeight = 200;
        this.separatorSize = 24;

        this.state = {
            wrapperStyle: null,
            applicationStyle: []
        };

    }

    getStyles = (data = this.props.data) => {

        if (!data || data.length < 1) {
            return [];
        }

        const wrapperWidth = this.wrapperEl.offsetWidth,
            totalCol = Math.max(Math.floor(wrapperWidth / this.applicationMinWidth), 1),
            totalRow = Math.ceil(data.length / totalCol),
            width = (wrapperWidth - (totalCol - 1) * this.separatorSize) / totalCol;

        return {
            wrapperStyle: {
                height: totalRow * this.applicationHeight + (totalRow - 1) * this.separatorSize
            },
            applicationStyle: data.map((item, index) => {

                const col = index % totalCol,
                    row = Math.floor(index / totalCol),
                    x = (width + this.separatorSize) * col,
                    y = (this.applicationHeight + this.separatorSize) * row;

                return {
                    width,
                    height: this.applicationHeight,
                    transform: `translate(${x}px, ${y}px)`
                };

            })
        };

    };

    updateStyles = (data = this.props.data) => {
        this.setState({
            ...this.getStyles(data)
        });
    };

    resizeHandler = debounce(() => {
        this.updateStyles();
    }, 350);

    componentDidMount() {
        this.wrapperEl = this.refs.wrapper;
        eventsOn(window, 'resize', this.resizeHandler);
    }

    componentDidUpdate() {
        if (this.props.data && this.props.data.length !== this.state.applicationStyle.length) {
            this.updateStyles();
        }
    }

    componentWillUnmount() {
        eventsOff(window, 'resize', this.resizeHandler);
    }

    render() {

        const {data} = this.props,
            {wrapperStyle, applicationStyle} = this.state;

        return (
            <div className="applications">

                <h1 className="applications-title">Applications</h1>

                <div ref="wrapper"
                     className="applications-wrapper"
                     style={wrapperStyle}>
                    {
                        data && data.map((item, index) => item ?
                            <Application key={index}
                                         visible={applicationStyle && applicationStyle.length > 0}
                                         style={applicationStyle && applicationStyle[index]}
                                         data={item}/>
                            :
                            null
                        )
                    }
                </div>

            </div>
        );

    }
}

Applications.propTypes = {
    data: PropTypes.array
};

export default connect(state => ({
    data: state.applications.data
}), dispatch => bindActionCreators({}, dispatch))(Applications);
