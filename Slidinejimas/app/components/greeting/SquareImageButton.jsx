import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const SquareImageButton =  (props) => {
  return <Link to={props.linkTo}>
    <div className="button-option">
      <img className="option-img" src={props.image} alt="Devbridge logo"/>
      <span className="option-txt">{props.title}</span>
    </div>
  </Link>;
};
export default SquareImageButton;

SquareImageButton.propTypes = {
  linkTo: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired, // imported image is encoded in base64 string
  title: PropTypes.string.isRequired,
};