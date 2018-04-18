import React, {Component} from 'react';

import * as types from 'reduxes/actionTypes/index';

function asyncComponent(getComponent, store) {

    return class AsyncComponent extends Component {

        static Component = null;

        constructor(props) {

            super(props);

            this.state = {
                Component: AsyncComponent.Component
            };

        }

        loadStartCallback() {
            store && setTimeout(() => {
                store.dispatch({type: types.LOAD_COMPONENT_START});
            }, 0);
        }

        loadCompleteCallback() {
            store && setTimeout(() => {
                store.dispatch({type: types.LOAD_COMPONENT_COMPLETE});
            }, 0);
        }

        componentWillMount() {

            if (!this.state.Component) {

                this.loadStartCallback();

                getComponent().then(({default: Component}) => {
                    AsyncComponent.Component = Component;
                    this.setState({
                        Component
                    }, () => {
                        this.loadCompleteCallback();
                    });
                });

            }

        }

        render() {

            const {Component} = this.state;

            if (Component) {
                return <Component {...this.props}/>;
            }

            return null;

        }

    };

}

export default asyncComponent;