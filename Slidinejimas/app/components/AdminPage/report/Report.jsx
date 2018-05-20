import React from 'react';
import DataTable from './DataTable';
import Filter from './components/Filter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/report';
import { GetCurrentSite } from '../../actions/sites';
import PropTypes from 'prop-types';

const initialFilterState = {
  time: null,
  type: null,
  location: null,
};

export class Report extends React.Component {
  constructor(props) {
    super(props);
    this.props.GetSites();
    this.props.GetCurrentSite();
    this.props.GetData(initialFilterState, this.props.pager);
  }
  changeLocation(e) {
    this.props.filter.location = e.target.value;
    this.props.SetFilter(this.props.filter);
    this.props.GetData(this.props.filter, this.props.pager);
  }
  changeType(e) {
    this.props.filter.type = e.target.value;
    this.props.SetFilter(this.props.filter);
    this.props.GetData(this.props.filter, this.props.pager);
  }
  changeTime(e) {
    this.props.filter.time = e.target.value;
    this.props.SetFilter(this.props.filter);
    this.props.GetData(this.props.filter, this.props.pager);
  }
  render() {
    return (
      <div>
        <title>Report</title>
        <div className='page-frame'>
          <br />
          <span className="admin-page-title">View visitors</span>
          <hr className='grey' />
          <div className='clearfix'>
            <Filter onChangeLocation={this.changeLocation.bind(this)} onChangeType={this.changeType.bind(this)} onChangeTime={this.changeTime.bind(this)} sites={this.props.sites} />
          </div>
          <hr className='grey' />
          <br />
          <DataTable
            data={this.props.data}
            pager={this.props.pager}
            filter={this.props.filter}
            GetData={this.props.GetData}
            sites={this.props.sites}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    data: state.report.data,
    filter: state.report.filter,
    currentSite: state.report.currentSite,
    pager: state.report.pager,
    sites: state.report.sites,
  }),
  (dispatch) => bindActionCreators({
    SetFilter: actions.setFilter,
    GetData: actions.getData,
    GetCurrentSite: GetCurrentSite,
    GetSites: actions.getSites,
  }, dispatch)
)(Report);

Report.propTypes = {
  data: PropTypes.any,
  filter: PropTypes.any,
  currentSite: PropTypes.any,
  GetData: PropTypes.func,
  SetFilter: PropTypes.func,
  GetCurrentSite: PropTypes.func,
  GetSites: PropTypes.func,
  pager: PropTypes.any,
  sites: PropTypes.any,
};