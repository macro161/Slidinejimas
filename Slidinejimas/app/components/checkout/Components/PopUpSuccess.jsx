import React from 'react';

export default class PopUpSuccess extends React.Component {

  render() {
    return (
      <div className='popup'>
        <div className='popup-inner-success'>
          <p className="checkout-form-text">Successful checkout</p>
          <p className="checkout-form-text space">Have a great day!</p>
        </div>
      </div>
    );
  }
}