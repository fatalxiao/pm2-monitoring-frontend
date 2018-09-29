import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import debounce from 'lodash/debounce';
import eventsOn from 'dom-helpers/events/on';
import eventsOff from 'dom-helpers/events/off';

import * as actions from 'reduxes/actions';

import Process from './Process/Process';

import 'scss/containers/app/processes/Processes.scss';

class Processes extends Component {

    constructor(props) {

        super(props);

        this.processMinWidth = 280;
        this.processHeight = 200;
        this.separatorSize = 24;

        this.state = {
            wrapperStyle: null,
            processStyle: []
        };

    }

    getStyles = (data = this.props.data) => {

        if (!data || data.length < 1) {
            return [];
        }

        const wrapperWidth = this.wrapperEl.offsetWidth,
            totalCol = Math.max(Math.floor(wrapperWidth / this.processMinWidth), 1),
            totalRow = Math.ceil(data.length / totalCol),
            width = (wrapperWidth - (totalCol - 1) * this.separatorSize) / totalCol;

        return {
            wrapperStyle: {
                height: totalRow * this.processHeight + (totalRow - 1) * this.separatorSize
            },
            processStyle: data.map((item, index) => {

                const col = index % totalCol,
                    row = Math.floor(index / totalCol),
                    x = (width + this.separatorSize) * col,
                    y = (this.processHeight + this.separatorSize) * row;

                return {
                    width,
                    height: this.processHeight,
                    transform: `translate(${x}px, ${y}px)`
                };

            })
        };

    };

    updateProcessesStyles = (data = this.props.data) => {
        this.setState({
            ...this.getStyles(data)
        });
    };

    resizeHandler = debounce(() => {
        this.updateProcessesStyles();
    }, 350);

    run = () => {
        const {runGetProcessesInterval} = this.props;
        runGetProcessesInterval && runGetProcessesInterval();
    };

    componentDidMount() {

        this.wrapperEl = this.refs.wrapper;
        eventsOn(window, 'resize', this.resizeHandler);

        this.run();

    }

    componentDidUpdate() {
        if (this.props.data && this.props.data.length !== this.state.processStyle.length) {
            this.updateProcessesStyles();
        }
    }

    componentWillUnmount() {
        eventsOff(window, 'resize', this.resizeHandler);
    }

    render() {

        const {data} = this.props,
            {wrapperStyle, processStyle} = this.state;

        return (
            <div className="processes">

                <h1 className="processes-title">Applications</h1>

                <div ref="wrapper"
                     className="process-wrapper"
                     style={wrapperStyle}>
                    {
                        data && data.map((item, index) => item ?
                            <Process key={index}
                                     style={processStyle && processStyle[index]}
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

Processes.propTypes = {
    data: PropTypes.array,
    runGetProcessesInterval: PropTypes.func
};

export default connect(state => ({
    data: state.processes.data
}), dispatch => bindActionCreators({
    runGetProcessesInterval: actions.runGetProcessesInterval
}, dispatch))(Processes);
