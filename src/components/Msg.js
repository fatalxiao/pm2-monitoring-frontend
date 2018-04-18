import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Util from 'vendors/Util';

import 'scss/components/Msg.scss';

export default class Msg extends Component {

    static Type = {
        ERROR: {
            theme: 'error',
            iconCls: 'icon-circle-with-cross'
        },
        WARNING: {
            theme: 'warning',
            iconCls: 'icon-warning'
        },
        SUCCESS: {
            theme: 'success',
            iconCls: 'icon-check'
        },
        INFO: {
            theme: 'info',
            iconCls: 'icon-info-with-circle'
        }
    };

    constructor(props) {
        super(props);
    }

    render() {

        const {className, children, type, hasIcon} = this.props,
            paperInfoClassName = (type ? ` theme-${type.theme}` : '') + (className ? ' ' + className : '');

        return (
            <div className={'msg' + paperInfoClassName}>
                <div className="msg-icon">
                    {
                        hasIcon ?
                            <i className={`${type.iconCls}`}></i>
                            :
                            null
                    }
                </div>
                <div className="msg-text">
                    {children}
                </div>
            </div>
        );
    }
}

Msg.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(Util.enumerateValue(Msg.Type)),
    hasIcon: PropTypes.bool
};

Msg.defaultProps = {
    className: '',
    type: Msg.Type.INFO,
    hasIcon: true
};
