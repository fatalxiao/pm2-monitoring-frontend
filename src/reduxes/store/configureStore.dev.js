import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from 'reduxes/reducers';
import ApiMiddleware from 'reduxes/middlewares/ApiMiddleware';

function configureStore(history) {

    const store = createStore(
        rootReducer,
        applyMiddleware(
            thunk,
            ApiMiddleware,
            routerMiddleware(history)
        )
    );

    if (module.hot) {
        module.hot.accept('reduxes/reducers', () => {
            const nextRootReducer = require('reduxes/reducers/index').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;

};

export default configureStore;