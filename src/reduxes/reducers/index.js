import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import device from './common/DeviceReducer';
import loadComponent from './common/LoadComponentReducer';
import appToaster from './common/ToasterReducer';
import appNotifier from './common/NotifierReducer';

import applications from './app/ApplicationsReducer';
import application from './app/ApplicationReducer';

const rootReducer = combineReducers({

    device,
    loadComponent,
    appToaster,
    appNotifier,

    applications,
    application,

    router: routerReducer

});

export default rootReducer;
