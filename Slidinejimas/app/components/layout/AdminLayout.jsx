
import React from 'react';
import Spinner from '../common/Spinner';
import { Route } from 'react-router';
import AdminHeader from '../header/AdminHeader';
import PropTypes from 'prop-types';
import Authentication from '../authentication/Authentication';

const AdminLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <div>
        <AdminHeader location={matchProps.location}/>
        <Spinner />
        <Authentication />
        <Component {...matchProps} />
      </div>
    )} />
  );
};

AdminLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired, // not sure how router resolves component to function, but ok
};

export default AdminLayoutRoute;