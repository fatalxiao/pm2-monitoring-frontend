import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import loadComponent from './common/LoadComponentReducer';
import appToaster from './common/ToasterReducer';
import appNotifier from './common/NotifierReducer';
import asyncMsgSeqReducer from './common/AsyncMsgSeqReducer';

import process from './app/ProcessReducer';

const rootReducer = combineReducers({

    loadComponent,
    appToaster,
    appNotifier,
    asyncMsgSeqReducer,

    process,

    router: routerReducer

});

export default rootReducer;