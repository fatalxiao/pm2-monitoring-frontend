import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MaterialProvider from 'alcedo-ui/MaterialProvider';
import Checkbox from 'alcedo-ui/Checkbox';
import Theme from 'alcedo-ui/Theme';

class CustomizedMaterialCheckbox extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {className, label, ...restProps} = this.props;

        return (
            <MaterialProvider className={className}
                              label={label}
                              isLabelAnimate={false}
                              useSeparator={false}>
                <Checkbox {...restProps}/>
            </MaterialProvider>
        );
    }

}

CustomizedMaterialCheckbox.propTypes = {
    theme: PropTypes.any,
    isLabelAnimate: PropTypes.bool,
    clearButtonVisible: PropTypes.bool
};

CustomizedMaterialCheckbox.defaultProps = {
    theme: Theme.HIGHLIGHT,
    isLabelAnimate: false,
    clearButtonVisible: false
};

export default CustomizedMaterialCheckbox;