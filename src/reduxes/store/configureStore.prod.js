import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';

import rootReducer from 'reduxes/reducers';

import Api from 'reduxes/middlewares/ApiMiddleware';

function configureStore(history) {
    return createStore(
        rootReducer,
        applyMiddleware(
            thunk,
            Api,
            routerMiddleware(history)
        )
    );
};

export default configureStore;