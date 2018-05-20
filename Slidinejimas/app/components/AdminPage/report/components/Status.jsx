import React from 'react';
import PropTypes from 'prop-types';

const Status = (props) => {
  return (
    <div className='status'>
      { props.status }
    </div>
  );
};

export default Status;

Status.propTypes={
  status: PropTypes.string,
};