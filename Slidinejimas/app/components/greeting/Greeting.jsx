import React from 'react';
import visitorsImage from './images/visitors.png';
import parcelImage from './images/parcel.png';
import exitImage from './images/exit.png';
import Title from '../common/Title';
import SquareImageButton from './SquareImageButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/sites';
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.props.ConfigureCurrentSite();
  }

  renderGreeting() {
    const { currentSiteIsConfigured } = this.props;
    const { currentSiteExists } = this.props;
    if (currentSiteIsConfigured) {
      if (currentSiteExists) {
        return (
          <div>
            <Title text={['What brings you here', 'today?']} size='Large' />
            <div  >
              <SquareImageButton linkTo='/CheckIn' image={visitorsImage} title='Visiting' />
              <SquareImageButton linkTo='/Delivery' image={parcelImage} title='Delivery' />
              <SquareImageButton linkTo='/CheckOut' image={exitImage} title='Check Out' />
            </div>
          </div>
        );
      } else {
        return <Title text={['Error: current site', 'does not exist', 'Please, contact the administrator']} size='Large' />;
      }
    } else {
      return <Title text={['Error: There is no', 'current site configured', 'Please, contact the administrator']} size='Large' />;
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <title>Greeting screen</title>

        {this.renderGreeting()}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    currentSiteIsConfigured: state.sites.currentSiteIsConfigured,
    currentSiteExists: state.sites.currentSiteExists,
  }),
  (dispatch) => bindActionCreators({
    ConfigureCurrentSite: actions.ConfigureCurrentSite,
  }, dispatch)
)(Greeting);

Greeting.propTypes = {
  ConfigureCurrentSite: PropTypes.func,
  currentSiteIsConfigured: PropTypes.bool,
  currentSiteExists: PropTypes.bool,
};