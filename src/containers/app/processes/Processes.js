import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import debounce from 'lodash/debounce';
import eventsOn from 'dom-helpers/events/on';
import eventsOff from 'dom-helpers/events/off';

import * as actions from 'reduxes/actions';

import Process from './Process';

import 'scss/containers/app/processes/Processes.scss';

class Processes extends Component {

    constructor(props) {

        super(props);

        this.runTimeoutId = null;
        this.processMinWidth = 240;
        this.processHeight = 120;
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
            totalCol = Math.floor(wrapperWidth / this.processMinWidth),
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

        const {getProcesses} = this.props;

        if (getProcesses) {
            getProcesses(responseData => {
                if (responseData && responseData.length !== this.state.processStyle.length) {
                    this.updateProcessesStyles(responseData);
                }
            });
            this.runTimeoutId = setTimeout(() => {
                this.run();
            }, 5000);
        }

    };

    componentDidMount() {

        this.wrapperEl = this.refs.wrapper;
        eventsOn(window, 'resize', this.resizeHandler);

        this.run();

    }

    componentWillUnmount() {
        eventsOff(window, 'resize', this.resizeHandler);
    }

    render() {

        const {data} = this.props,
            {wrapperStyle, processStyle} = this.state;

        return (
            <div className="processes">

                <h1 className="processes-title">Apps</h1>

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
    getProcesses: PropTypes.func
};

export default connect(state => ({
    data: state.processes.data
}), dispatch => bindActionCreators({
    getProcesses: actions.getProcesses
}, dispatch))(Processes);
