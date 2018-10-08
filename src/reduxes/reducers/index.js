import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import device from './common/DeviceReducer';
import loadComponent from './common/LoadComponentReducer';
import appToaster from './common/ToasterReducer';
import appNotifier from './common/NotifierReducer';

import nav from './app/pm/nav/NavReducer';
import createApplication from './app/pm/nav/CreateApplicationReducer';

import applications from './app/pm/applications/ApplicationsReducer';
import application from './app/pm/applications/ApplicationReducer';

const rootReducer = combineReducers({

    device,
    loadComponent,
    appToaster,
    appNotifier,

    nav,
    createApplication,

    applications,
    application,

    router: routerReducer

});

export default rootReducer;
