import React from 'react';
import IdleTimer from 'react-idle-timer';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

const Config = require('Config');
const initialState = { redirect: false};
  
class IdleRedirect extends React.Component {
  
  constructor() {
    super();
    this.state = {
      initialState,
    };
    this.doRedirect = this.doRedirect.bind(this);
  }

  doRedirect() {
    this.setState({ redirect: true });
  }

  render() {
    return (location.pathname === this.props.redirectTo) ? null : this.redirectComponent();
  }
  
  redirectComponent() {
    return  this.state.redirect ?
      <Redirect to={this.props.redirectTo} />
      :
      <IdleTimer
        element={document}
        idleAction={this.doRedirect}
        timeout={Config.maxIdleTime}
      />;
  }

  componentDidUpdate() {
    //reset state after redirect
    if (this.state.redirect) {
      this.setState(initialState);
    }
  }
}

export default IdleRedirect;

IdleRedirect.propTypes = {
  redirectTo: PropTypes.string.isRequired,
};