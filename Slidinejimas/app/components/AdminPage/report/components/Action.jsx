import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/checkout';

class Action extends React.Component {
  constructor(props){
    super(props);
    this.checkOut = this.checkOut.bind(this);
  }

  checkOut(){
    this.props.dispatchCheckout(this.props.Name, this.props.Surname, false, this.props.Site);
  }

  render() {
    return (
      <td className='action'>
        {this.props.isEligibleForCheckOut ? (
          <div className='action-link' onClick={this.checkOut}>
            <i className='fa fa-sign-out'></i>
            <span>Check Out</span>
          </div>
        ) : '-'}
      </td>
    );
  }
}

export default connect(
  () => ({
  }),
  (dispatch) => bindActionCreators({
    dispatchCheckout: actions.CheckOut,
  }
    , dispatch)
)(Action);

Action.propTypes = {
  isEligibleForCheckOut: PropTypes.bool,
  dispatchCheckout: PropTypes.func,
  Name: PropTypes.string,
  Surname: PropTypes.string,
  Site: PropTypes.string,
};