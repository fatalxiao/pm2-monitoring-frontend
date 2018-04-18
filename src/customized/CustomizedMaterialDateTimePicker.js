import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MaterialDateTimePicker from 'alcedo-ui/MaterialDateTimePicker';
import Theme from 'alcedo-ui/Theme';

class CustomizedMaterialDateTimePicker extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MaterialDateTimePicker {...this.props}/>
        );
    }

}

CustomizedMaterialDateTimePicker.propTypes = {
    theme: PropTypes.any,
    isLabelAnimate: PropTypes.bool,
    clearButtonVisible: PropTypes.bool
};

CustomizedMaterialDateTimePicker.defaultProps = {
    theme: Theme.HIGHLIGHT,
    isLabelAnimate: false,
    clearButtonVisible: false
};

export default CustomizedMaterialDateTimePicker;