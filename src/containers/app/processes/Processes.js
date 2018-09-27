import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from 'reduxes/actions';

import Process from './Process';

import 'scss/containers/app/processes/Processes.scss';

class Processes extends Component {

    constructor(props) {

        super(props);

        this.runTimeoutId = null;
        this.processMinWidth = 240;
        this.processHeight = 120;
        this.separatorSize = 16;

        this.state = {
            styles: []
        };

    }

    getStyles = (data = this.props.data) => {

        if (!data || data.length < 1) {
            return [];
        }

        const wrapperWidth = window.innerWidth - 120,
            totalCol = Math.floor(wrapperWidth / this.processMinWidth),
            width = (wrapperWidth - (totalCol + 1) * this.separatorSize) / totalCol;

        return data.map((item, index) => {

            const col = index % totalCol,
                row = Math.floor(index / totalCol),
                x = this.separatorSize * (col + 1) + width * col,
                y = this.separatorSize * (row + 1) + this.processHeight * row;

            return {
                width,
                height: this.processHeight,
                transform: `translate(${x}px, ${y}px)`
            };
        });

    };

    run = () => {

        const {getProcesses} = this.props;

        if (getProcesses) {
            getProcesses(responseData => {
                if (responseData && responseData.length !== this.state.styles.length) {
                    this.setState({
                        styles: this.getStyles(responseData)
                    });
                }
            });
            this.runTimeoutId = setTimeout(() => {
                this.run();
            }, 5000);
        }

    };

    componentDidMount() {
        this.run();
    }

    render() {

        const {data} = this.props,
            {styles} = this.state;

        return (
            <div className="processes">

                <h1 className="processes-title">Apps</h1>

                <div className="process-wrapper">
                    {
                        data && data.map((item, index) => item ?
                            <Process key={index}
                                     style={styles && styles[index]}
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
