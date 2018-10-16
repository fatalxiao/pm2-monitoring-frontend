import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import cloneDeep from 'lodash/cloneDeep';
import classNames from 'classnames';

class LineChart extends Component {

    constructor(props) {

        super(props);

        this.DEFAULT_STYLE = {
            height: 80
        };

        this.DEFAULT_CONFIG = {
            title: {
                show: false
            },
            grid: {
                show: true,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                containLabel: true,
                borderColor: '#e7e7e7'
            },
            xAxis: {
                type: 'time',
                interval: 150000,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#f3f3f3'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
                interval: 25,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#f3f3f3'
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                }
            },
            series: [{
                type: 'line',
                showSymbol: false,
                // hoverAnimation: false,
                areaStyle: {}
            }]
        };

    }

    getOption = () => {
        const {data, color} = this.props,
            config = cloneDeep(this.DEFAULT_CONFIG);
        config.series[0].data = data;
        config.color = color;
        return config;
    };

    render() {

        const {className, style} = this.props,

            chartClassName = classNames('line-chart', {
                [className]: className
            });

        return (
            <ReactEcharts className={chartClassName}
                          style={{...this.DEFAULT_STYLE, ...style}}
                          option={this.getOption()}/>
        );

    }
}

LineChart.propTypes = {

    className: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.array,

    data: PropTypes.array

};

export default LineChart;
