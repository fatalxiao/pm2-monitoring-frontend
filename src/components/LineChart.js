import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import classNames from 'classnames';
import merge from 'lodash/merge';
import moment from 'moment';

import 'scss/components/LineChart.scss';

class LineChart extends Component {

    constructor(props) {

        super(props);

        this.DEFAULT_STYLE = {
            height: 80
        };

    }

    getDefaultConfig = () => {

        const {unit} = this.props;

        return {
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
                    show: false,
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
                splitLine: {
                    show: false,
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
            tooltip: {
                trigger: 'axis',
                formatter(params) {

                    const title = moment(params[0].name).format('HH:mm:ss'),
                        value = params[0].value[1];

                    return '<div>'
                        + '<div style="text-align: center;font-size: 12px;opacity: .5;">'
                        + `${title}`
                        + '</div>'
                        + '<div style="text-align: center;">'
                        + `${value ? `${value} ${unit}` : ''}`
                        + '</div>'
                        + '</div>';

                },
                axisPointer: {
                    animation: false
                }
            },
            series: [{
                type: 'line',
                showSymbol: false,
                // hoverAnimation: false,
                areaStyle: {}
            }]
        };
    };

    getOption = () => {
        const {data, color, config} = this.props,
            result = merge(this.getDefaultConfig(), config);
        result.series[0].data = data;
        result.color = color;
        return result;
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

    data: PropTypes.array,
    unit: PropTypes.string,
    config: PropTypes.object

};

export default LineChart;
