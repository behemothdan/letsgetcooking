import React from 'react';
import './Header.css';
import logo from '../../images/letsgetcooking-logo-white.png';

const Header = () => (
    <header className="header">
      <div className="nav-container">
        <div className="headerlogo">
          <img src={logo} alt="Let's Get Cooking!" />
        </div>
        <div className="title">
          <h1>let&apos;s get cooking</h1>
        </div>
        <div>

        </div>
      </div>
    </header>
  )

  export default Header