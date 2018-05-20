import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pager.totalReportCount !== prevProps.pager.totalReportCount) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    let pager = this.props.pager;

    if (page < 1 || (page !== 1 && page > pager.totalPages)) {
      return;
    }

    pager = this.getPager(this.props.pager.totalReportCount, page, this.props.pager.reportsPerPage);

    this.props.GetData(this.props.filter, pager);
  }

  getPager(totalReportCount, currentPage, reportsPerPage) {
    const totalPages = Math.ceil(totalReportCount / reportsPerPage);

    let startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    const range = (start, end) => (
      Array.from(Array(end - start + 1).keys()).map(i => i + start)
    );
    const pages = range(startPage, endPage);

    return {
      totalPages: totalPages,
      totalReportCount: totalReportCount,
      currentPage: currentPage,
      reportsPerPage: reportsPerPage,
      startPage: startPage,
      endPage: endPage,
      pages: pages,
    };
  }

  render() {
    const { pager } = this.props;

    if (!pager.pages || pager.totalPages === 0) {
      return null;
    }

    return (
      <ul className="pagination">
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(1)}>First</a>
        </li>
        <li className={pager.currentPage === 1 ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
        </li>
        {pager.pages.map((page, index) =>
          <li key={index} className={pager.currentPage === page ? 'active' : ''}>
            <a onClick={() => this.setPage(page)}>{page}</a>
          </li>
        )}
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
        </li>
        <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
          <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = {
  pager: PropTypes.any,
  filter: PropTypes.any,
  GetData: PropTypes.func,
  initialPage: PropTypes.number,
};

const defaultProps = {
  initialPage: 1,
};

Pagination.defaultProps = defaultProps;
export default Pagination;