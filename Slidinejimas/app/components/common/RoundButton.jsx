import React from 'react';
import PropTypes from 'prop-types';

const RoundButton = (props) => {
  return <div className="center" >
    <button onClick={props.isActive ? props.onClick : () => {}} className={'start-button ' + (props.isActive ? 'red' : 'gray')}>
      <span className="bold">{props.title}</span>
    </button>
  </div>;
};

export default RoundButton;

RoundButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};