import React from 'react';
import PropTypes from 'prop-types';

export default class PopUpTryAgain extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='popup'>
        <div className='popup-inner-wrong-information'>
          <p className="checkout-form-text">Unsuccessful checkout</p>
          <p className="checkout-form-text">Try to enter your information one more time.</p>
          <button align="center" className="checkout-form-button" onClick={this.props.onOk}> Ok</button>
        </div>
      </div>
    );
  }
}
PopUpTryAgain.propTypes = {
  onOk: PropTypes.func,
};
