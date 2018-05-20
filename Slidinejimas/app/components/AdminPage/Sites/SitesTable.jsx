import React from 'react';
import SitesTableRow from './SitesTableRow';
import PropTypes from 'prop-types';

export default class SitesTable extends React.Component {
  constructor(props) {
    super(props);

    this.editSite = this.editSite.bind(this);
  }

  editSite(Id, Name, Address, Phone, ContactEmail){
    this.props.editSite(Id, Name, Address, Phone, ContactEmail);
  }

  renderSites() {
    const { sites } = this.props;
    return sites.map(site => {
      return (
        <SitesTableRow
          key={site.Id}
          Id={site.Id}
          Name={site.Name}
          Address={site.Address}
          Phone={site.Phone}
          ContactEmail={site.ContactEmail}
          editSite={this.editSite}
          DeleteSite={this.props.DeleteSite}
          disable={this.props.disable}
          SetCurrentSite={this.props.SetCurrentSite}
          currentSiteId={this.props.currentSiteId}
        />);
    });
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th className="site-title">Site Title</th>
            <th className="address">Address</th>
            <th className="phoneNumber">Phone</th>
            <th className="email">Contact Email</th>
            <th className="edit">Actions</th>
            <th className="remove"></th>
            <th className="current">Current</th>
          </tr>
          {this.renderSites()}
        </tbody>
      </table >
    );
  }
}
SitesTable.propTypes = {
  editSite : PropTypes.any,
  disable : PropTypes.any,
  DeleteSite: PropTypes.func,
  sites: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.string,
    Name: PropTypes.string,
    Address: PropTypes.string,
    Phone: PropTypes.string,
    ContactEmai: PropTypes.string,
  })),
  SetCurrentSite: PropTypes.func,
  currentSiteId: PropTypes.string,
};