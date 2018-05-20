import React from 'react';
import AdminTable from './AdminTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/admin';
import PropTypes from 'prop-types';

class MasterAdmin extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      Name: '',
      Password: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
  }
  componentWillMount() {
    this.props.dispatchGetAll();
  }
  addAdmin() {
    if (this.state.Name != '' && this.state.Password != '') {
      this.props.dispatchAddAdmin(this.state.Name, this.state.Password);
      this.setState({
        Name: '',
        Password: '',
      });
    }
  }
  handleNameChange(e) {
    const nameValue = e.target.value;
    this.setState({
      Name: nameValue,
    });
  }

  handlePassChange(e) {
    const passValue = e.target.value;
    this.setState({
      Password: passValue,
    });
  }

  render() {
    console.log(this.props.admins);
    return (
      <div>
        <title>Master Admin</title>
        <br />
        <div className='page-frame'>
          <span className="admin-page-title">Paslaugu sarasas</span>
          <br />
          <AdminTable admins={this.props.admins} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    admins: state.admin.admins,
  }),
  (dispatch) => bindActionCreators({
    dispatchAddAdmin: actions.AddAdmin,
    dispatchRemoveAdmin: actions.RemoveAdmin,
    dispatchGetAll: actions.GetAll,
  }
    , dispatch)
)(MasterAdmin);

MasterAdmin.propTypes = {
  admins: PropTypes.any,
  dispatchGetAll: PropTypes.any,
  dispatchAddAdmin: PropTypes.func.isRequired,
  dispatchRemoveAdmin: PropTypes.func,
};