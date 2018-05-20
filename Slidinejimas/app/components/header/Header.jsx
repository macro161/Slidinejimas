import React from 'react';
import backImage from './images/back.png';
import logoImage from './images/logo.png';
import {Link} from 'react-router-dom';

const BackButton = () => {
  return location.pathname === '/' ? '' :
    <Link to="/">
      <img className="header-image back" src={backImage}/>   
    </Link>;
};

const Header = () => {
  return <header className="main-header">
    {BackButton()}
    <img className="header-image logo" src={logoImage}/> 
  </header>;  
};

export default Header;