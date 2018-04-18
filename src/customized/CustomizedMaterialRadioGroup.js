import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MaterialProvider from 'alcedo-ui/MaterialProvider';
import RadioGroup from 'alcedo-ui/RadioGroup';
import Theme from 'alcedo-ui/Theme';

class CustomizedMaterialRadioGroup extends Component {

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
                <RadioGroup {...restProps}/>
            </MaterialProvider>
        );
    }

}

CustomizedMaterialRadioGroup.propTypes = {
    theme: PropTypes.any,
    isLabelAnimate: PropTypes.bool,
    clearButtonVisible: PropTypes.bool
};

CustomizedMaterialRadioGroup.defaultProps = {
    theme: Theme.HIGHLIGHT,
    isLabelAnimate: false,
    clearButtonVisible: false
};

export default CustomizedMaterialRadioGroup;