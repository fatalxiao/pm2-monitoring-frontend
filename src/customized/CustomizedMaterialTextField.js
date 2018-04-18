import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MaterialTextField from 'alcedo-ui/MaterialTextField';
import Theme from 'alcedo-ui/Theme';

class CustomizedMaterialTextField extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MaterialTextField {...this.props}/>
        );
    }

}

CustomizedMaterialTextField.propTypes = {
    theme: PropTypes.any,
    isLabelAnimate: PropTypes.bool,
    clearButtonVisible: PropTypes.bool
};

CustomizedMaterialTextField.defaultProps = {
    theme: Theme.HIGHLIGHT,
    isLabelAnimate: false,
    clearButtonVisible: false
};

export default CustomizedMaterialTextField;