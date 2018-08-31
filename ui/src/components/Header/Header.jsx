import React from 'react';
import './Header.css';
import logo from '../../images/letsgetcooking-logo-white.png';
import SearchInput from '../SearchInput/SearchInput'
import PropTypes from "prop-types";

const Header = (props) => (
  <header className="header">
    <div className="nav-container">
      <div className="headerlogo">
        <img src={logo} alt="Let's Get Cooking!" />
      </div>
      <div className="title">
        <h1>Let&apos;s get cooking!</h1>
      </div>
      <div className="userMenu">
        {props.userMenu}
      </div>
    </div>
    <SearchInput searchitem="recipes" name="searchInput" labelValue="What are we searching for?" placeholder="Let's get cooking!" />
  </header>
)

Header.propTypes = {
  userMenu: PropTypes.element
}

export default Header