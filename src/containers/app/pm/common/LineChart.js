import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import cloneDeep from 'lodash/cloneDeep';
import classNames from 'classnames';

import theme from 'statics/ChartTheme';

class LineChart extends Component {

    constructor(props) {

        super(props);

        echarts.registerTheme('dark', theme);

        this.DEFAULT_STYLE = {
            height: 100
        };

        this.DEFAULT_CONFIG = {
            title: {
                show: false
            },
            grid: {
                top: 8,
                left: 0,
                right: 0,
                bottom: 8,
                containLabel: true
            },
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
                },
                axisLine: {
                    lineStyle: {
                        color: '#e7e7e7'
                    }
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
                splitNumber: 1,
                splitLine: {
                    show: false
                },
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

        const {className, style} = this.props,

            chartClassName = classNames('line-chart', {
                [className]: className
            });

        return (
            <ReactEcharts className={chartClassName}
                          style={{...this.DEFAULT_STYLE, ...style}}
                          option={this.getOption()}
                          theme="dark"/>
        );

    }
}

LineChart.propTypes = {

    className: PropTypes.string,
    style: PropTypes.object,

    data: PropTypes.array

};

export default LineChart;
