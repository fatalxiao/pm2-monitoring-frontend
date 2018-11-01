import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextField from 'alcedo-ui/MaterialTextField';
import PaperInfo from './PaperInfo';

import 'scss/components/FormField.scss';

class FormTextField extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {

                className, error, isErrorPlaceholder,

                ...restProps

            } = this.props,

            fieldClassName = classNames('form-field', {
                [className]: className
            });

        return (
            <>
                <TextField className={fieldClassName}
                           {...restProps}/>
                <PaperInfo className="form-field-error"
                           visible={!!error}
                           type={PaperInfo.Type.ERROR}
                           isPlaceholder={isErrorPlaceholder}>
                    {error}
                </PaperInfo>
            </>
        );

    }
}

FormTextField.propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    isErrorPlaceholder: PropTypes.bool
};

FormTextField.defaultProps = {
    isErrorPlaceholder: true
};

export default FormTextField;
