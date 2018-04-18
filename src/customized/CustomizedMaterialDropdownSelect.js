import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MaterialDropdownSelect from 'alcedo-ui/MaterialDropdownSelect';
import Theme from 'alcedo-ui/Theme';

class CustomizedMaterialDropdownSelect extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {theme, isLabelAnimate, ...restProps} = this.props;

        return (
            <MaterialDropdownSelect {...restProps}
                                    theme={theme}
                                    isLabelAnimate={isLabelAnimate}/>
        );
    }

}

CustomizedMaterialDropdownSelect.propTypes = {
    theme: PropTypes.any,
    isLabelAnimate: PropTypes.bool
};

CustomizedMaterialDropdownSelect.defaultProps = {
    theme: Theme.HIGHLIGHT,
    isLabelAnimate: false
};

export default CustomizedMaterialDropdownSelect;