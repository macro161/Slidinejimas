import React from 'react';
import TableHead from './components/TableHead';
import TableRow from './TableRow';
import PropTypes from 'prop-types';
import Pagination from './components/Pagination';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rows = this.props.data.map(row => {
      return <TableRow key={row.Id + '_'} data={row} sites = {this.props.sites}/>;
    });

    return (
      <div className="report-table-wrapper">
        <table className="table">
          <TableHead />
          <tbody>{rows}</tbody>
        </table>
        <Pagination
          pager={this.props.pager}
          filter={this.props.filter}
          GetData={this.props.GetData}
        />
      </div>
    );
  }
}

DataTable.propTypes = {
  data: PropTypes.any,
  GetData: PropTypes.func,
  pager: PropTypes.any,
  filter: PropTypes.any,
  sites: PropTypes.any,
};
