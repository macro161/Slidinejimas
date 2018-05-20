import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';

export default class AdminTableRow extends React.Component{
  constructor(props){
    super(props);
    this.deleteThis = this.deleteThis.bind(this);
  }

  deleteThis() {
    this.props.RemoveAdmin(this.props.Login);
  }
  render(){
    return(
      <tr>
        <th>{this.props.Login}</th>
        <th>
          <Button onClick = {this.deleteThis} className="sites-action-button sites-remove">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
            <span>Remove</span>
          </Button>
        </th>
      </tr>
    );
  }
}
AdminTableRow.propTypes = {
  Login: PropTypes.string.isRequired,
  RemoveAdmin: PropTypes.func.isRequired,
};