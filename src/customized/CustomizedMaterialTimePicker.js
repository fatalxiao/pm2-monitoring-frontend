import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MaterialTimePicker from 'alcedo-ui/MaterialTimePicker';
import Theme from 'alcedo-ui/Theme';

class CustomizedMaterialTimePicker extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MaterialTimePicker {...this.props}/>
        );
    }

}

CustomizedMaterialTimePicker.propTypes = {
    theme: PropTypes.any,
    isLabelAnimate: PropTypes.bool,
    clearButtonVisible: PropTypes.bool
};

CustomizedMaterialTimePicker.defaultProps = {
    theme: Theme.HIGHLIGHT,
    isLabelAnimate: false,
    clearButtonVisible: false
};

export default CustomizedMaterialTimePicker;