import React from 'react';
import Webcam from 'react-webcam';
import RoundButton from '../common/RoundButton';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/camera';
import { Save } from '../actions/checkin';

class Camera extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenshot: this.props.screenshot,
      finished: false,
      tempScreenshot: null,
    };
    
  }
  
  capture() {
    const screenshot = this.webcam.getScreenshot();
    this.props.dispatchGetScreenshot(screenshot);
    this.setState({
      tempScreenshot: screenshot,
    });
    
  }

  returnScreenShot(screenshot) {

    this.props.returnScreenshot(screenshot);
  }

  continue() {
    this.returnScreenShot(this.state.tempScreenshot);
    this.setState({
      finished:true,
    });
    this.props.action;
  }
  render() {
    if (this.state.finished) {
      return <Redirect to='/' />;
    }
    return (
      <div className="row">
        <div className = "column center">
          <Webcam
            height={307}
            width={410}
            ref = {(webcam) =>this.webcam = webcam}
            screenshotFormat="image/jpeg"
            audio={false}
          />
          <RoundButton isActive={true} onClick={this.capture.bind(this)}></RoundButton>
        </div>
        <div className="column center">
          {this.state.tempScreenshot ? <div> <img src={this.state.tempScreenshot} /> <RoundButton title="NEXT" isActive={true} onClick={this.continue.bind(this) }>Continue</RoundButton></div> : null}
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    screenshot: state.camera.screenshot,
  }),
  (dispatch) => bindActionCreators({
    dispatchGetScreenshot: actions.GetPhoto,
    saveGuest: Save,
  }
    , dispatch)
)(Camera);

Camera.propTypes = {
  screenshot: PropTypes.arrayOf(PropTypes.byte),
  dispatchGetScreenshot: PropTypes.func.isRequired,
  Save: PropTypes.func.isRequired,
  action: PropTypes.func,
  returnScreenshot: PropTypes.func.isRequired,
};