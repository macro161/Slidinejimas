import React from 'react';
import Header from '../header/Header';
import IdleRedirect from '../common/IdleRedirect';
import Spinner from '../common/Spinner';
import { Route } from 'react-router';
import PropTypes from 'prop-types';

const PublicLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <div>
        <Header />
        <IdleRedirect redirectTo="/" />
        <Spinner />
        <Component {...matchProps} />
      </div>
    )} />
  );
};

PublicLayoutRoute.propTypes = {
  component: PropTypes.func.isRequired, // not sure how router resolves component to function, but ok
};
  
export default PublicLayoutRoute;