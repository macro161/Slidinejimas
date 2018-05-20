import React from 'react';
//import { Redirect } from 'react-router-dom';
import RoundButton from '../common/RoundButton';
import Title from '../common/Title';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/checkin';
import { GetCurrentSite } from '../actions/sites';
import PropTypes from 'prop-types';
import Camera from '../camera/Camera';

const initialState = {
  Name: '',
  Surname: '',
  Awaiter: '',
  Screenshot: null,
  Continue: false,
};

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handleAwaiterChange = this.handleAwaiterChange.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
    this.resetComponent = this.resetComponent.bind(this);
    this.props.getSite();
    
  }

  componentWillUnmount() {
    this.resetComponent();
  }

  componentWillReceiveProps(nextProps) { // if the awaiterName is autofilled, enable the next button 
    if (this.props.awaiterName === '' && nextProps.awaiterName !== '') {
      this.props.dispatchValidate(this.state.Name, this.state.Surname, nextProps.awaiterName);
    }
  }

  handleNameChange(e) {
    const nameValue = e.target.value;
    this.setState({
      Name: nameValue,
    });
    this.props.dispatchValidate(nameValue, this.state.Surname, this.state.Awaiter);
    if (nameValue.length >= 2) {
      this.props.dispatchCheckAwaiter(nameValue, this.state.Surname);
    }
    if(this.props.awaiterFieldDisabled){
      this.props.dispatchValidate(nameValue, this.state.Surname, this.props.awaiterName);
    }
  }

  handleSurnameChange(e) {
    const surnameValue = e.target.value;
    this.setState({
      Surname: surnameValue,
    });
    this.props.dispatchValidate(this.state.Name, surnameValue, this.state.Awaiter);
    if (surnameValue.length >= 2) {
      this.props.dispatchCheckAwaiter(this.state.Name, surnameValue);
    }
    if(this.props.awaiterFieldDisabled){
      this.props.dispatchValidate(this.state.Name, surnameValue, this.props.awaiterName);
    }
  }

  handleAwaiterChange(e) {
    const awaiterValue = e.target.value;
    this.setState({
      Awaiter: awaiterValue,
    });
    this.props.dispatchValidate(this.state.Name, this.state.Surname, awaiterValue);
  }

  buttonPressed() {
    let awaiter;
    if (this.props.awaiterFieldDisabled) { // if it's disabled, it means that the awaiter is autofilled
      awaiter = this.props.awaiterName;
    } else {
      awaiter = this.state.Awaiter;
    }
    this.setState({
      Awaiter : awaiter,
    });
    this.setState({
      Continue : true,
    });
  }

  returnScreenshotCallback(getScreenshot) {
    this.setState({
      Screenshot: getScreenshot,
    }); 
    this.props.dispatchSave(this.state.Name, this.state.Surname, this.state.Awaiter, getScreenshot, this.props.interviewSubject);
  }

  resetComponent() {
    this.setState(initialState);
    this.props.dispatchReset();
  }

  render() {
    if (this.state.Continue) {
      return <Camera
        returnScreenshot={this.returnScreenshotCallback.bind(this)}
      />;
    }
    if (this.props.error) {
      alert('Error: ' + this.props.error);
    }
    return (
      <div className="content-wrapper">
        <title>Check In</title>
        <Title text="Enter your personal details:" />
        <input type="text"
          className="input-text"
          placeholder="First name"
          value={this.state.Name}
          onChange={this.handleNameChange}
          autoComplete="off"
        />
        <input type="text"
          className="input-text"
          placeholder="Second name"
          value={this.state.Surname}
          onChange={this.handleSurnameChange}
          autoComplete="off"
        />
        <Title text="Who are you visiting:" />
        <input type="text"
          className="input-text input-second-column"
          placeholder="Awaiter's name"
          value={!this.props.awaiterFieldDisabled ? this.state.Awaiter : this.props.awaiterName}
          onChange={this.handleAwaiterChange}
          disabled={this.props.awaiterFieldDisabled}
          autoComplete="off"
        />
        <RoundButton title="NEXT" isActive={this.props.valid} onClick={this.buttonPressed.bind(this)} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    valid: state.checkin.valid,
    pro: state,
    saved: state.checkin.saved,
    error: state.checkin.error,
    awaiterFieldDisabled: state.checkin.awaiterFieldDisabled,
    awaiterName: state.checkin.awaiterName,
    interviewSubject: state.checkin.interviewSubject,
    screenshot: state.camera.screenshot,
  }),
  (dispatch) => bindActionCreators({
    dispatchSave: actions.Save,
    dispatchValidate: actions.Validate,
    getSite: GetCurrentSite,
    dispatchReset: actions.Reset,
    dispatchCheckAwaiter: actions.CheckAwaiter,
  }
    , dispatch)
)(CheckIn);

CheckIn.propTypes = {
  valid: PropTypes.bool.isRequired,
  dispatchSave: PropTypes.func.isRequired,
  dispatchValidate: PropTypes.func.isRequired,
  getSite: PropTypes.func.isRequired,
  saved: PropTypes.bool.isRequired,
  error: PropTypes.string,
  dispatchReset: PropTypes.func.isRequired,
  awaiterFieldDisabled: PropTypes.bool,
  awaiterName: PropTypes.string,
  interviewSubject: PropTypes.string,
  dispatchCheckAwaiter: PropTypes.func,
  screenshot: PropTypes.arrayOf(PropTypes.byte),
};