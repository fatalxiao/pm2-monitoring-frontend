import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TextArea from 'alcedo-ui/MaterialTextArea';

import 'scss/components/FormField.scss';

class FormTextArea extends Component {

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
                <TextArea className={fieldClassName}
                          {...restProps}/>
                <div className="form-field-error">
                    {error || ''}
                </div>
            </Fragment>
        );

    }
}

FormTextArea.propTypes = {
    className: PropTypes.string,
    error: PropTypes.string
};

export default FormTextArea;
