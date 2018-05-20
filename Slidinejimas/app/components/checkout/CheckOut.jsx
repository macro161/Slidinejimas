import React from 'react';
import RoundButton from '../common/RoundButton';
import Title from '../common/Title';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/checkout';
import { GetCurrentSite } from '../actions/sites';
import PropTypes from 'prop-types';
import PopUpTryAgain from '../checkout/Components/PopUpTryAgain';
import PopUpSuccess from '../checkout/Components/PopUpSuccess';

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Surname: '',
      redirect: false,
    };
    this.props.getCurrentSite();
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
    this.validateData = this.validateData.bind(this);
    this.returnToMain = this.returnToMain.bind(this);
  }

  handleNameChange(e) {
    const nameValue = e.target.value;
    this.setState({
      Name: nameValue,
    });
    this.props.dispatchValidate(nameValue, this.state.Surname, this.state.Awaiter);
  }

  handleSurnameChange(e) {
    const surnameValue = e.target.value;
    this.setState({
      Surname: surnameValue,
    });
    this.props.dispatchValidate(this.state.Name, surnameValue, this.state.Awaiter);
  }

  validateData(Name, Surname, Awaiter) {
    return Name !== '' && Surname !== '' && Awaiter !== '';
  }

  buttonPressed() {
    this.props.dispatchCheckout(this.state.Name, this.state.Surname, this.props.secondClick, null);
  }
  returnToMain() {
    this.props.dispatchRedirect();
    setTimeout(function () {
      this.setState({
        redirect: true,
      });
    }.bind(this), 2000);
  }

  render() {
    if (this.props.redirect) {
      this.returnToMain();
    }
    if (this.state.redirect) {
      this.props.hideSuccess();
      return <Redirect to='/' />;
    }
    return <div className="content-wrapper">
      <title>Checkout</title>
      {this.props.showWrong ? <PopUpTryAgain onOk={this.props.hideWrong} /> : null}
      {this.props.showSuccess ? <PopUpSuccess /> : null}
      <Title text="Please, enter your personal details again" />
      <input type="text" id="name" className="input-text" placeholder="First name" value={this.state.Name} onChange={this.handleNameChange} autoComplete="off" />
      <input type="text" id="lastName" className="input-text" placeholder="Last name" value={this.state.Surname} onChange={this.handleSurnameChange} autoComplete="off" />
      <Title text={['Sorry, that we ask you to enter this twice', "it's for security reasons"] /* eslint-disable-line quotes */} size="Small" />
      <RoundButton title="Next" isActive={this.validateData(this.state.Name, this.state.Surname)} onClick={this.buttonPressed} />
    </div>;
  }
}

export default connect(
  (state) => ({
    redirect: state.checkout.redirect,
    showWrong: state.checkout.ShowWrong,
    showSuccess: state.checkout.ShowSuccess,
    secondClick: state.checkout.secondClick,
  }),
  (dispatch) => bindActionCreators({
    dispatchCheckout: actions.CheckOut,
    dispatchValidate: actions.Validate,
    dispatchRedirect: actions.Redirect,
    hideWrong: actions.HideWrong,
    hideSuccess: actions.HideSuccess,
    getCurrentSite: GetCurrentSite,
  }
    , dispatch)
)(CheckOut);

CheckOut.propTypes = {
  redirect: PropTypes.bool.isRequired,
  showWrong: PropTypes.any,
  showSuccess: PropTypes.any,
  dispatchCheckout: PropTypes.func.isRequired,
  dispatchValidate: PropTypes.func.isRequired,
  dispatchRedirect: PropTypes.func.isRequired,
  hideWrong: PropTypes.any,
  hideSuccess: PropTypes.any,
  secondClick: PropTypes.any,
  getCurrentSite: PropTypes.any,
};