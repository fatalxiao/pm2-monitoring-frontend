import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import debounce from 'lodash/debounce';
import eventsOn from 'dom-helpers/events/on';
import eventsOff from 'dom-helpers/events/off';

import {Responsive, WidthProvider} from 'react-grid-layout';
import Application from './application/ApplicationCard';

import 'scss/containers/app/pm/applications/Applications.scss';

const ResponsiveGridLayout = WidthProvider(Responsive);

class Applications extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {data} = this.props;

        return (
            <div className="applications">

                <h1 className="applications-title">Applications</h1>

                <ResponsiveGridLayout className="applications-wrapper"
                                      breakpoints={{lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0}}
                                      cols={{lg: 6, md: 4, sm: 3, xs: 2, xxs: 1}}
                                      rowHeight={200}>
                    {
                        data && data.map((item, index) => item ?
                            <Application key={index}
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
