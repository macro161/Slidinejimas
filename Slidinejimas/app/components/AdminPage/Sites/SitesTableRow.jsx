import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

export default class SitesTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.deleteThis = this.deleteThis.bind(this);
    this.editThis = this.editThis.bind(this);
  }

  deleteThis() {
    this.props.DeleteSite(this.props.Id);
  }

  editThis() {
    this.props.editSite(this.props.Id, this.props.Name, this.props.Address, this.props.Phone, this.props.ContactEmail);
  }

  setThisAsCurrentSite() {
    this.props.SetCurrentSite(this.props.Id);
  }

  render() {
    const titleStyle = this.props.currentSiteId === this.props.Id ? 'highlight-current-site' : '';
    return (
      <tr>
        <td className={titleStyle}>{this.props.Name} office</td>
        <td>{this.props.Address}</td>
        <td>{this.props.Phone}</td>
        <td>{this.props.ContactEmail}</td>
        <td>
          <Button onClick={this.editThis} className="sites-action-button sites-edit" variant="raised" disabled = {this.props.disable}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
            <span>Edit</span>
          </Button>
        </td>
        <td>
          <Button onClick={this.deleteThis} className="sites-action-button sites-remove" variant="raised" disabled = {this.props.disable}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
            <span>Remove</span>
          </Button>
        </td>
        <td>
          <Button onClick={this.setThisAsCurrentSite.bind(this)} className="select-site" variant="raised" disabled = {this.props.disable}>
            SELECT
          </Button>
        </td>
      </tr>
    );
  }
}

SitesTableRow.propTypes = {
  Id: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  Address: PropTypes.string.isRequired,
  Phone: PropTypes.string.isRequired,
  ContactEmail: PropTypes.string.isRequired,
  editSite: PropTypes.func.isRequired,
  DeleteSite: PropTypes.func.isRequired,
  disable: PropTypes.any,
  SetCurrentSite: PropTypes.func,
  currentSiteId: PropTypes.string,
};