import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import cloneDeep from 'lodash/cloneDeep';

class LineChart extends Component {

    constructor(props) {

        super(props);

        this.DEFAULT_CONFIG = {
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
                splitNumber: 1,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            series: [{
                type: 'line',
                showSymbol: false,
                hoverAnimation: false
            }]
        };

    }

    getOption = () => {
        const {data} = this.props,
            config = cloneDeep(this.DEFAULT_CONFIG);
        config.series[0].data = data;
        return config;
    };

    render() {
        return (
            <ReactEcharts option={this.getOption()}/>
        );
    }
}

LineChart.propTypes = {
    data: PropTypes.array
};

export default LineChart;
