'use strict';

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {renderRoutes} from 'react-router-config';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from 'reduxes/store';
import {configureRoutes} from './config.routes';

import 'scss/index.scss';

// prevent console log in demo and production env
if (process.env.NODE_ENV === 'production') {
    console.log = () => {
    };
}

const history = createBrowserHistory(),
    store = configureStore(history);

injectTapEventPlugin();

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {renderRoutes(configureRoutes(store))}
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app-container')
);