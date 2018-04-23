import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import loadComponent from './common/LoadComponentReducer';
import appToaster from './common/ToasterReducer';
import appNotifier from './common/NotifierReducer';

import monitoring from './app/MonitoringReducer';
import processes from './app/ProcessesReducer';
import process from './app/ProcessReducer';

const rootReducer = combineReducers({

    loadComponent,
    appToaster,
    appNotifier,

    monitoring,
    processes,
    process,

    router: routerReducer

});

export default rootReducer;