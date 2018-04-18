import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import 'scss/components/FieldSet.scss';

export default class FieldSet extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {children, className, title, ...restProps} = this.props,

            wrapperClassName = classNames('field-set', {
                [className]: className
            });

        return (
            <div {...restProps}
                 className={wrapperClassName}>

                <h3 className="field-set-title">
                    {title}
                </h3>

                <div className="field-set-content">
                    {children}
                </div>

            </div>
        );
    }
}