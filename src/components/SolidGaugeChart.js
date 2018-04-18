import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import classNames from 'classnames';

import 'scss/components/SolidGaugeChart.scss';

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

class SolidGaugeChart extends Component {

    constructor(props) {

        super(props);

        this.chart = null;

        this.getConfig = ::this.getConfig;

    }

    getConfig(props = this.props) {

        const {title, value, total} = props;

        return {
            credits: {
                enabled: false
            },
            chart: {
                type: 'solidgauge'
            },
            title: {
                text: `<div class="solid-gauge-chart-value">${value}<span class="solid-gauge-chart-total">/${total}</span></div><div class="solid-gauge-chart-title">${title}</div>`,
                align: 'center',
                verticalAlign: 'middle',
                useHTML: true,
                floating: true
            },
            tooltip: {
                enabled: false
            },
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    outerRadius: '100%',
                    innerRadius: '100%',
                    borderWidth: '6px',
                    borderColor: '#f7f7f7'
                }]
            },
            yAxis: {
                min: 0,
                max: total,
                lineWidth: 0,
                tickPositions: []
            },
            plotOptions: {
                solidgauge: {
                    borderWidth: '6px',
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            series: [{
                borderColor: '#5BB0E6',
                data: [{
                    radius: '100%',
                    innerRadius: '100%',
                    y: value
                }]
            }]
        };
    }

    componentDidMount() {
        this.chart = Highcharts.chart(this.refs.chart, this.getConfig());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.chart.series[0].setData({
                radius: '100%',
                innerRadius: '100%',
                y: nextProps.value
            });
        }
    }

    render() {

        const {className, ...restProps} = this.props,

            chartClassName = classNames('solid-gauge-chart', {
                [className]: className
            });

        return (
            <div {...restProps}
                 ref="chart"
                 className={chartClassName}></div>
        );
    }
}

SolidGaugeChart.propTypes = {

    className: PropTypes.string,
    style: PropTypes.object,

    title: PropTypes.string,
    value: PropTypes.number,
    total: PropTypes.number

};

export default SolidGaugeChart;