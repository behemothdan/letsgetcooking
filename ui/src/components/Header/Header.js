import React from 'react';
import './Header.css';

const Header = () => (
    <header className="App-header">
      <img src={process.env.PUBLIC_URL + '/img/grandstack.png'} className="App-logo" alt="logo" />
      <h1 className="App-title">Let's get cooking...</h1>
    </header>
  )

  export default Header