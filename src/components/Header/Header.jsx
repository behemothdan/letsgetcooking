import React from 'react';
import SearchInput from 'components/SearchInput/SearchInput';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = (props) => (
    <header className="header">
        <div className="navContainer">
            <section className="headerLogo">

            </section>
            <section className="title">
                <h1><Link to="/">Let&apos;s get_2 cooking!</Link></h1>
            </section>
            <section className="userMenu">
                {props.userMenu}
            </section>
        </div>
        <SearchInput searchitem="recipes" name="searchInput" placeholder="I want some..." />
    </header>
)

Header.propTypes = {
    userMenu: PropTypes.element
}

export default Header