import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Responsive, WidthProvider} from 'react-grid-layout';
import Application from './application/ApplicationCard';

import 'scss/containers/app/pm/applications/Applications.scss';

const ResponsiveGridLayout = WidthProvider(Responsive);

class Applications extends Component {

    constructor(props) {
        super(props);
    }

    getLayout = col => {

        const {data} = this.props;

        return data ? data.map((item, index) => ({
                i: '' + index,
                x: index % col,
                y: parseInt(index / col),
                w: 1,
                h: 1
            }))
            :
            [];

    };

    getLayouts = () => {
        return {
            lg: this.getLayout(6),
            md: this.getLayout(4),
            sm: this.getLayout(3),
            xs: this.getLayout(2),
            xxs: this.getLayout(1)
        };
    };

    render() {

        const {data} = this.props;

        return (
            <div className="applications">

                <h1 className="applications-title">Applications</h1>

                <ResponsiveGridLayout className="applications-wrapper"
                                      breakpoints={{lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0}}
                                      cols={{lg: 6, md: 4, sm: 3, xs: 2, xxs: 1}}
                                      layouts={this.getLayouts()}
                                      rowHeight={200}
                                      isResizable={false}>
                    {
                        data && data.map((item, index) => item ?
                            <Application key={'' + index}
                                         data={item}/>
                            :
                            null
                        )
                    }
                </ResponsiveGridLayout>

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
