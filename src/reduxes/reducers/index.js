import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import loadComponent from './common/LoadComponentReducer';
import appToaster from './common/ToasterReducer';
import appNotifier from './common/NotifierReducer';
import asyncMsgSeqReducer from './common/AsyncMsgSeqReducer';

import group from './app/common/GroupReducer';
import patients from './app/common/PatientsReducer';
import sensoryBlock from './app/common/SensoryBlockReducer';

import patientList from './app/modules/PatientListReducer';
import editPatient from './app/modules/editPatient/EditPatientReducer';
import patientBaseInfo from './app/modules/editPatient/PatientBaseInfoReducer';
import patientInfo from './app/modules/editPatient/PatientInfoReducer';
import analgesia from './app/modules/editPatient/AnalgesiaReducer';
import observal from './app/modules/editPatient/ObservalReducer';

const rootReducer = combineReducers({

    loadComponent,
    appToaster,
    appNotifier,
    asyncMsgSeqReducer,

    group,
    patients,
    sensoryBlock,

    patientList,
    editPatient,
    patientBaseInfo,
    patientInfo,
    analgesia,
    observal,

    router: routerReducer

});

export default rootReducer;