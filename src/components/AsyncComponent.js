import React, {Component} from 'react';

import * as types from 'reduxes/actionTypes';

function asyncComponent(getComponent, store) {

    return class AsyncComponent extends Component {

        constructor(props) {

            super(props);

            this.state = {
                Component: null
            };

        }

        loadStartCallback = () => {
            setTimeout(() => store.dispatch({type: types.LOAD_COMPONENT_START}), 0);
        };

        loadCompleteCallback = () => {
            setTimeout(() => store.dispatch({type: types.LOAD_COMPONENT_COMPLETE}), 0);
        };

        loadComponent = callback => {

            /**
             * 使用 babel-plugin-transform-import-sync 加快开发环境编译速度
             */
            if (process.env.NODE_ENV === 'development') {
                this.setState({
                    Component: getComponent()
                }, () => {
                    callback && callback();
                });
                return;
            }

            getComponent().then(component => {
                this.setState({
                    Component: component.default || component
                }, () => {
                    callback && callback();
                });
            });

        };

        componentDidMount() {
            if (!this.state.Component) {
                this.loadStartCallback();
                this.loadComponent(this.loadCompleteCallback);
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