import React from 'react';
import PropTypes from 'prop-types';

const sizeNameSmall='Small';
const sizeNameLarge='Large';

const Title =  (props) => {
  return <div className={'title ' + resolveSizeClass(props.size)}>
    {resolveText(props.text)}
  </div>;
};

function resolveSizeClass(size) {
  switch (size) {
    case sizeNameSmall:
      return 'small';
    case sizeNameLarge:
      return 'large';
    default:
      return '';
  }
}

function resolveText(text) {
  if (text instanceof Array)
    return text.map((element,idx) => <span key={idx}>{element}</span>);
  return <span >{text}</span>;
}

export default Title;

Title.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  size: PropTypes.oneOf([sizeNameSmall,sizeNameLarge]),
};