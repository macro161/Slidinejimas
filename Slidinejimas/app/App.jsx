import { hot } from 'react-hot-loader';
import React from 'react';
import './styles.css';
import Login from './components/login/Login';
import MasterAdmin from './components/AdminPage/masteradmin/MasterAdmin';
import { Switch } from 'react-router';
import Sites from './components/AdminPage/Sites/Sites';
import { Provider } from 'react-redux';
import store, { history } from './components/store';
import { ConnectedRouter } from 'react-router-redux';
import ErrorPage from './components/Error/Error404';
import PublicLayoutRoute from './components/layout/PublicLayout';
import AdminLayoutRoute from './components/layout/AdminLayout';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <PublicLayoutRoute exact path="/" component={Login} />
          <PublicLayoutRoute path="/login" component={Login} />
          <AdminLayoutRoute path="/masteradmin" component={MasterAdmin} />
          <AdminLayoutRoute path="/sites" component={Sites} />
          <PublicLayoutRoute path="*" component={ErrorPage} />
        </Switch>
      </div>
    </ConnectedRouter >
  </Provider>
);

export default hot(module)(App);