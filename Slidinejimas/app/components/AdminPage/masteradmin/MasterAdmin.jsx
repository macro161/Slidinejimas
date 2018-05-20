import React from 'react';
import Button from 'material-ui/Button';
import AdminTable from './AdminTable';
import TextField from 'material-ui/TextField';
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
    return (
      <div>
        <title>Master Admin</title>
        <br />
        <div className='page-frame'>
          <span className="admin-page-title">List of Admins</span>
          <hr />
          <label >   Login:  </label>
          <TextField className='admin-nick' value={this.state.Name} onChange={this.handleNameChange}></TextField>
          <label >&emsp;&emsp;&emsp;&emsp;Password:  </label>
          <TextField type="password" value={this.state.Password} onChange={this.handlePassChange}></TextField>
          <label>&emsp;&emsp;&emsp;&emsp;</label>
          <Button className='add-location-button' variant='raised' color="secondary" onClick={this.addAdmin} >
            <div className='bigger-font' >ADD ADMIN</div>
          </Button>
          <hr />
          <br />
          <AdminTable RemoveAdmin={this.props.dispatchRemoveAdmin} admins={this.props.admins} />
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