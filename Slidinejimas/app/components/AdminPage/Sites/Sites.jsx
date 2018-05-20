import React from 'react';
import SitesTable from './SitesTable';
import Button from 'material-ui/Button';
import SitesForm from './SitesForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/sites';
import PropTypes from 'prop-types';

const initialState = {
  Name: '',
  Address: '',
  Phone: '',
  ContactEmail: '',
  showForm: false,
  editSite: false,
};

class Sites extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.props.GetSites();
    this.props.GetCurrentSite();
  }

  addSite() {
    this.setState({
      showForm: true,
    });
  }

  onClose() {
    this.setState(initialState);
  }

  onSubmit(Name, Address, Phone, ContactEmail) {
    const siteExists = () => { 
      const { sites } = this.props;
      for (const site of sites) {
        if (site.Name == Name) {
          return true;
        }
      }
      return false;
    };

    this.setState({
      Name: Name,
      Address: Address,
      Phone: Phone,
      ContactEmail: ContactEmail,
    });

    const { sites } = this.props;
    if (this.state.editSite) {
      let uniqueSite = true;
      for (const site of sites) {
        if (this.state.Id == site.Id) {
          if (site.Name != Name && siteExists()) {
            uniqueSite = false;
          }
          if (uniqueSite) {
            this.props.EditSite(site.Id, Name, Address, Phone, ContactEmail);
          } else {
            alert('Site with that title already exists!');
          }
          break;
        }
      }
    }
    else {
      if (siteExists()) {
        alert('That site is already registered');
      } else {
        this.props.AddSite(Name, Address, Phone, ContactEmail);
      }
    }
    this.setState(initialState);
  }

  editSite(Id, Name, Address, Phone, ContactEmail) {
    this.setState({
      Id: Id,
      Name: Name,
      Address: Address,
      Phone: Phone,
      ContactEmail: ContactEmail,
      showForm: true,
      editSite: true,
    });
  }

  render() {
    const className = 'page-frame';
    this.state.showForm ? className + ' disableForForm' : null;
    return (
      <div>
        <title>Sites</title>
        <br />
        {this.state.showForm ? <SitesForm Name={this.state.Name} Address={this.state.Address} Phone={this.state.Phone} ContactEmail={this.state.ContactEmail} onClose={this.onClose.bind(this)} onSubmit={this.onSubmit.bind(this)} /> : null}
        <div className={className}>
          <span className="admin-page-title">Administer Sites</span>
          <hr />
          <Button disabled={this.state.showForm} onClick={this.addSite.bind(this)} className="add-location-button" variant="raised" color="secondary">
            <div className ='bigger-font'>ADD LOCATION</div>
          </Button>
          <hr />
          <br />
          <SitesTable
            sites={this.props.sites}
            editSite={this.editSite.bind(this)}
            disable={this.state.showForm}
            DeleteSite={this.props.DeleteSite}
            SetCurrentSite={this.props.SetCurrentSite}
            currentSiteId={this.props.currentSiteId}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    sites: state.sites.sites,
    currentSiteId: state.sites.currentSiteId,
  }),
  (dispatch) => bindActionCreators({
    GetSites: actions.GetSites,
    AddSite: actions.AddSite,
    EditSite: actions.EditSite,
    GetCurrentSite: actions.GetCurrentSite,
    SetCurrentSite: actions.SetCurrentSite,
    DeleteSite: actions.DeleteSite,
  }, dispatch)
)(Sites);

Sites.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.shape({
    Id: PropTypes.string,
    Name: PropTypes.string,
    Address: PropTypes.string,
    Phone: PropTypes.string,
    ContactEmai: PropTypes.string,
  })),
  currentSiteId: PropTypes.string,
  GetSites: PropTypes.func,
  AddSite: PropTypes.func,
  EditSite: PropTypes.func,
  GetCurrentSite: PropTypes.func,
  SetCurrentSite: PropTypes.func,
  DeleteSite: PropTypes.func,
};