import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextField from 'alcedo-ui/MaterialTextField';

import 'scss/components/FormField.scss';

class FormTextField extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {

                className,

                ...restProps

            } = this.props,

            fieldClassName = classNames('form-field', {
                [className]: className
            });

        return (
            <TextField className={fieldClassName}
                       {...restProps}/>
        );

    }
}

FormTextField.propTypes = {
    className: PropTypes.string
};

export default FormTextField;
