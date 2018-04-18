import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import classNames from 'classnames';

import 'scss/components/CircularChart.scss';

class CircularChart extends Component {

    constructor(props) {

        super(props);

        this.chart = null;

        this.getConfig = ::this.getConfig;

    }

    getConfig(props = this.props) {

        const {title, data} = props,
            total = data && data.length > 0 ? data.map(item => item[1]).reduce((a, b) => a + b) : 0,
            self = this;

        return [{
            credits: {
                enabled: false
            },
            chart: {
                type: 'pie'
            },
            colors: ['#5BB0E6', '#87d068', '#fa0', '#f50'],
            title: {
                floating: true,
                useHTML: true,
                text: title
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: false,
                    point: {
                        events: {
                            mouseOver: function (e) {
                                self.chart.setTitle({
                                    text: `<div class="circular-chart-value">${e.target.y}<span class="circular-chart-total">/${total}</span></div><div class="circular-chart-title">${e.target.name}</div>`
                                });
                            },
                            mouseOut: function (e) {
                                self.chart.setTitle({
                                    text: title
                                });
                            }
                        }
                    }
                }
            },
            series: [{
                innerSize: '90%',
                name: '',
                data
            }]
        }, function (c) {
            // 环形图圆心
            var centerY = c.series[0].center[1],
                titleHeight = parseInt(c.title.styles.fontSize);
            c.setTitle({
                y: centerY + titleHeight / 2
            });
            self.chart = c;
        }];
    }

    componentDidMount() {
        this.chart = Highcharts.chart(this.refs.chart, ...this.getConfig());
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

            chartClassName = classNames('circular-chart', {
                [className]: className
            });

        return (
            <div {...restProps}
                 ref="chart"
                 className={chartClassName}></div>
        );
    }
}

CircularChart.propTypes = {

    className: PropTypes.string,
    style: PropTypes.object,

    title: PropTypes.string,
    data: PropTypes.array

};

export default CircularChart;