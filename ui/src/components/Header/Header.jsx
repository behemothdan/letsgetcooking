import React from 'react';
import './Header.css';
import logo from '../../images/letsgetcooking-logo.png';

const Header = () => (
    <header className="header">
      <img src={logo} alt="logo" />
      <h1 className="title">Let's get cooking...</h1>
    </header>
  )

  export default Header