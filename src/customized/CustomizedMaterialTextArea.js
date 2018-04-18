import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MaterialTextArea from 'alcedo-ui/MaterialTextArea';
import Theme from 'alcedo-ui/Theme';

class CustomizedMaterialTextArea extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MaterialTextArea {...this.props}/>
        );
    }

}

CustomizedMaterialTextArea.propTypes = {
    theme: PropTypes.any,
    isLabelAnimate: PropTypes.bool,
    clearButtonVisible: PropTypes.bool,
    autoHeight: PropTypes.bool
};

CustomizedMaterialTextArea.defaultProps = {
    theme: Theme.HIGHLIGHT,
    isLabelAnimate: false,
    clearButtonVisible: false,
    autoHeight: true
};

export default CustomizedMaterialTextArea;