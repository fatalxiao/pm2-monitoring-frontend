import React, {Component} from 'react';
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

                className,

                ...restProps

            } = this.props,

            fieldClassName = classNames('form-field', {
                [className]: className
            });

        return (
            <TextArea className={fieldClassName}
                      {...restProps}/>
        );

    }
}

FormTextArea.propTypes = {
    className: PropTypes.string
};

export default FormTextArea;
