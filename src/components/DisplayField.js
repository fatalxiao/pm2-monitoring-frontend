import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MaterialProvider from 'alcedo-ui/MaterialProvider';

import 'scss/components/DisplayField.scss';

class DisplayField extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {className, label, children, ...restProps} = this.props,

            fieldClassName = classNames('display-field', {
                [className]: className
            });

        return (
            <MaterialProvider {...restProps}
                              className={fieldClassName}
                              label={label}
                              isLabelAnimate={false}
                              useSeparator={false}>
                <div className="display-field-content">
                    {children}
                </div>
            </MaterialProvider>
        );
    }
}

DisplayField.propTypes = {

    className: PropTypes.string,

    label: PropTypes.string

};

DisplayField.defaultProps = {

    className: null,

    label: ''

};

export default DisplayField;