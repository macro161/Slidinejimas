import { hot } from 'react-hot-loader';
import React from 'react';
import './styles.css';
import Login from './components/login/Login';
import Delivery from './components/delivery/Delivery';
import MasterAdmin from './components/AdminPage/masteradmin/MasterAdmin';
import CheckOut from './components/checkOut/CheckOut';
import { Switch } from 'react-router';
import CheckIn from './components/checkIn/CheckIn';
import Sites from './components/AdminPage/Sites/Sites';
import { Provider } from 'react-redux';
import store, { history } from './components/store';
import Report from './components/AdminPage/report/Report';
import { ConnectedRouter } from 'react-router-redux';
import ErrorPage from './components/Error/Error404';
import Camera from './components/camera/Camera';
import PublicLayoutRoute from './components/layout/PublicLayout';
import AdminLayoutRoute from './components/layout/AdminLayout';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <PublicLayoutRoute exact path="/" component={Login} />
          <PublicLayoutRoute path="/delivery" component={Delivery} />
          <PublicLayoutRoute path="/checkin" component={CheckIn} />
          <PublicLayoutRoute path="/checkout" component={CheckOut} />
          <PublicLayoutRoute path="/login" component={Login} />
          <PublicLayoutRoute path="/TakePhoto" component={Camera} />
          <AdminLayoutRoute path="/masteradmin" component={MasterAdmin} />
          <AdminLayoutRoute path="/sites" component={Sites} />
          <AdminLayoutRoute path="/report" component={Report} />
          <PublicLayoutRoute path="*" component={ErrorPage} />
        </Switch>
      </div>
    </ConnectedRouter >
  </Provider>
);

export default hot(module)(App);