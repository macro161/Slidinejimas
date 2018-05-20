import React from 'react';
import RoundButton from '../common/RoundButton';
import Title from '../common/Title';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/delivery';
import { GetCurrentSite } from '../actions/sites';
import PropTypes from 'prop-types';
import Camera from '../camera/Camera';

class Delivery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CompanyName: '',
      Name: '',
      Surname: '',
      redirect: false,
      screenshot: null,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
    this.props.getSite();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  handleCompanyNameChange(e) {
    const companyNameValue = e.target.value;
    this.setState({
      CompanyName: companyNameValue,
    });
    this.props.dispatchValidate(companyNameValue, this.state.Name, this.state.Surname);
  }

  handleNameChange(e) {
    const nameValue = e.target.value;
    this.setState({
      Name: nameValue,
    });
    this.props.dispatchValidate(this.state.CompanyName, nameValue, this.state.Surname);
  }

  handleSurnameChange(e) {
    const surnameValue = e.target.value;
    this.setState({
      Surname: surnameValue,
    });
    this.props.dispatchValidate(this.state.CompanyName, this.state.Name, surnameValue);
  }

  buttonPressed() {
    this.setState({
      redirect: true,
    });
  }

  returnScreenshotCallback(getScreenshot) {
    this.setState({
      screenshot: getScreenshot,
    }); 
    this.props.dispatchSave(this.state.CompanyName, this.state.Name, this.state.Surname, getScreenshot);
  }

  render() {
    if (this.state.redirect) {
      return <Camera
        returnScreenshot={this.returnScreenshotCallback.bind(this)}
      />;
    }
    if (this.props.error) {
      alert('Error: ' + this.props.error);
    }
    return (
      <div className="content-wrapper">
        <title>Delivery</title>
        <Title text={['What company are you', 'delivering from?']} />
        <input type="text" className="input-text" placeholder="Enter company name" name="CompanyName" onChange={this.handleCompanyNameChange} autoComplete="off"/>
        <Title text="Enter your personal details:" />
        <input type="text" className="input-text" placeholder="First name" value={this.state.Name} onChange={this.handleNameChange} autoComplete="off"/>
        <input type="text" className="input-text" placeholder="Second name" value={this.state.Surname} onChange={this.handleSurnameChange} autoComplete="off"/>
        <RoundButton title="NEXT" isActive={this.props.valid} onClick={this.buttonPressed.bind(this)} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    valid: state.delivery.valid,
    saved: state.delivery.saved,
    error: state.delivery.error,
  }),
  (dispatch) => bindActionCreators({
    dispatchSave: actions.Save,
    dispatchValidate: actions.Validate,
    getSite: GetCurrentSite,
    dispatchReset: actions.Reset,
  }, dispatch))(Delivery);

Delivery.propTypes = {
  valid: PropTypes.bool.isRequired,
  dispatchSave: PropTypes.func.isRequired,
  dispatchValidate: PropTypes.func.isRequired,
  getSite: PropTypes.func.isRequired,
  dispatchReset: PropTypes.func.isRequired,
  saved: PropTypes.bool.isRequired,
  error: PropTypes.string,
};