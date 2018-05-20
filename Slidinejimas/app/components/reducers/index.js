import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import delivery from './delivery';
import sites from './sites';
import report from './report';
import checkin from './checkin';
import checkout from './checkout';
import admin from './admin';
import camera from './camera';
import login from './login';
import user from './user';

const rootReducer = combineReducers({ 
  routing: routerReducer,
  delivery, sites, checkin, checkout,
  report, admin, login, user, camera, 
});

export default rootReducer;