import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Title from '../common/Title';
import RoundButton from '../common/RoundButton';
import * as actions from '../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      valid: false,
    };

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);
  }

  valdidateInput(username, password){
    this.setState({valid: !!username && !!password});
  }

  handleLoginChange(e) {
    const usernameValue = e.target.value;
    this.setState({
      username: usernameValue,
    });
    this.valdidateInput(usernameValue, this.state.password);
  }

  handlePasswordChange(e) {
    const passwordValue = e.target.value;
    this.setState({
      password: passwordValue,
    }); 
    this.valdidateInput(this.state.username, passwordValue);
  }

  login(){
    this.props.dispatchLogin(this.state.username, this.state.password);
  }

  resolveErrorMessage(){
    if (!this.props.errorCode) {
      return;
    }
    const errorMessage = this.props.errorCode === 401 ? 'Neteisingas slaptažodis' : 'We are not sure how, but you managed to break our server!';

    return <div className="errorHolder">
      <span>
        {errorMessage}
      </span>
    </div>;
  }

  render() {
    if (this.props.loginSuccess)
    {
      return <Redirect to='/report' />;
    }
    return (
      <div className="content-wrapper">
        <title>Prisijungimas</title>
        <Title text="Prisijungti"/>
        {this.resolveErrorMessage()}
        <input type="text" className="input-text" placeholder="Login " value={this.state.username} onChange={this.handleLoginChange}/>
        <input type="password" className="input-text" placeholder="Password " value={this.state.password} onChange={this.handlePasswordChange}/>
        <RoundButton title="Prisijungti" isActive={this.state.valid} onClick={this.login}  />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    errorCode: state.login.errorCode,
    loginSuccess: state.login.success,
  }),
  (dispatch) => bindActionCreators({
    dispatchLogin: actions.Login,
    dispatchReset: actions.LoginReset,
  }, dispatch))(Login);

Login.propTypes = {
  errorCode: PropTypes.number,
  loginSuccess: PropTypes.bool,
  dispatchLogin: PropTypes.func.isRequired,
};