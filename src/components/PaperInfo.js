import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Transition} from 'react-transition-group';
import classNames from 'classnames';

import Util from 'vendors/Util';

import 'scss/components/PaperInfo.scss';

class PaperInfo extends Component {

    static Type = {
        ERROR: 'error',
        WARNING: 'warning',
        SUCCESS: 'success',
        INFO: 'info'
    };

    constructor(props) {
        super(props);
    }

    render() {

        const {className, children, type, hasIcon, isAnimate, visible, duration, isPlaceholder} = this.props;

        return (
            <Transition in={visible}
                        timeout={duration}>
                {state => {

                    const wrapperClassName = classNames('paper-info', state, {
                        [`theme-${type}`]: type,
                        isAnimate,
                        unPlaceholder: !isPlaceholder,
                        [className]: className
                    });

                    return (
                        <div className={wrapperClassName}>
                            {children}
                        </div>
                    );

                }}
            </Transition>
        );
    }
}

PaperInfo.propTypes = {

    className: PropTypes.string,

    visible: PropTypes.bool,
    type: PropTypes.oneOf(Util.enumerateValue(PaperInfo.Type)),
    hasIcon: PropTypes.bool,
    isAnimate: PropTypes.bool,
    duration: PropTypes.number,
    isPlaceholder: PropTypes.bool

};

PaperInfo.defaultProps = {
    visible: false,
    type: PaperInfo.Type.INFO,
    hasIcon: true,
    isAnimate: true,
    duration: 250,
    isPlaceholder: true
};

export default PaperInfo;
