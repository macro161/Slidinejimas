import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/auth';
import PropTypes from 'prop-types';

class AdminHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <header className="main-header">
      <LinkButton name="Paslaugos" link="/sites" />
      <LinkButton name="Log Out" link="/" onClick={this.props.dispatchLogOut} />
    </header>;  
  }
}

export default connect(
  null,
  (dispatch) => bindActionCreators({
    dispatchLogOut: actions.LogOut,
  }, dispatch))(AdminHeader);

AdminHeader.propTypes = {
  dispatchLogOut: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const LinkButton =  (p) => {
  return <Link to={p.link}>
    <button className={'header-button' + (location.pathname === p.link ? ' selected': '') + (p.onClick ? ' danger': '')} onClick={p.onClick}>{p.name}</button>
  </Link>;
};