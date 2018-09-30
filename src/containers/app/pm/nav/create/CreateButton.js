import React, {Component} from 'react';
import classNames from 'classnames';

import IconButton from 'alcedo-ui/IconButton';
import Form from './CreateForm';

import 'scss/containers/app/pm/nav/create/CreateButton.scss';

class CreateButton extends Component {

    constructor(props) {

        super(props);

        this.state = {
            avtivated: false
        };

    }

    toggle = () => {
        this.setState({
            avtivated: !this.state.avtivated
        });
    };

    render() {

        const {avtivated} = this.state,

            className = classNames('create-button-wrapper', {
                avtivated
            });

        return (
            <div className={className}>

                <div className="create-button-bg"></div>

                <Form avtivated={avtivated}/>

                <IconButton className="create-button"
                            iconCls="icon-plus"
                            onClick={this.toggle}/>

            </div>
        );
    }
}

export default CreateButton;
