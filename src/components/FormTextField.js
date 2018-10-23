import React, {Component, Fragment} from 'react';
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

                className, error,

                ...restProps

            } = this.props,

            fieldClassName = classNames('form-field', {
                [className]: className
            });

        return (
            <Fragment>
                <TextField className={fieldClassName}
                           {...restProps}/>
                <div className="form-field-error">
                    {error || ''}
                </div>
            </Fragment>
        );

    }
}

FormTextField.propTypes = {
    className: PropTypes.string,
    error: PropTypes.string
};

export default FormTextField;
