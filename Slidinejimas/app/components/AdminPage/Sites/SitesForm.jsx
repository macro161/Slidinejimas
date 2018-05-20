import React from 'react';
import PropTypes from 'prop-types';

export default class SiteForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: this.props.Name,
      Address: this.props.Address,
      Phone: this.props.Phone,
      ContactEmail: this.props.ContactEmail,
      onClose: this.props.onClose,
    };
  }

  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit() {
    this.props.onSubmit(this.state.Name, this.state.Address, this.state.Phone, this.state.ContactEmail);
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <header className="formHeader">
            <span className="formHeaderText">ADD NEW SITE</span>
            <span className="formHeaderClose" onClick={this.props.onClose}>✖</span>
          </header>
          <p className="form-text">Which office are you adding?</p>
          <input type="text" className="form-input" placeholder="Enter site title" name="Name" value={this.state.Name} onChange={this.inputChange.bind(this)} />
          <p className="form-text">Whats office address?</p>
          <input type="text" align="left" className="form-input" placeholder="Enter address" name="Address" value={this.state.Address} onChange={this.inputChange.bind(this)} />
          <p className="form-text">Office phone number?</p>
          <input type="text" align="right" className="form-input" placeholder="Enter phone number" name="Phone" value={this.state.Phone} onChange={this.inputChange.bind(this)} />
          <p className="form-text">Office contact email?</p>
          <input type="text" align="left" className="form-input" placeholder="Enter contact email" name="ContactEmail" value={this.state.ContactEmail} onChange={this.inputChange.bind(this)} />
          <button align="left" className="submitButton" disabled={!this.state.Name || !this.state.Address || !this.state.Phone || !this.state.ContactEmail} type="button" onClick={this.onSubmit.bind(this)}> Submit</button>
        </div>
      </div>
    );
  }
}

SiteForm.propTypes = {
  Name: PropTypes.any,
  Address: PropTypes.any,
  Phone: PropTypes.any,
  ContactEmail: PropTypes.any,
  onClose: PropTypes.any,
  onSubmit: PropTypes.any,
};

SiteForm.defaulProps = {
  Name: '',
  Address: '',
  Phone: '',
  ContactEmail: '',
};