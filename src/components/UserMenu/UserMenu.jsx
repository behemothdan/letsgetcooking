import React, { Fragment, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Auth from 'auth';
import PlateUtensils from '../../images/svg-icons/PlateUtensils';
import RecipeBook from '../../images/svg-icons/RecipeBook';
import Bookstack from '../../images/svg-icons/Bookstack';
import CookingPot from '../../images/svg-icons/CookingPot';
import User from '../../images/svg-icons/User';
import './UserMenu.css';

const auth = new Auth();

function UserMenu() {
    const [showMenu, toggleMenu] = useState(false);

    const openMenu = useCallback((event) => {
        event.preventDefault();
        toggleMenu(true);
        document.addEventListener('click', closeMenu)
    })

    const closeMenu = useCallback(() => {
        toggleMenu(false);
        document.removeEventListener('click', closeMenu)
    })

    const login = () => {auth.login()}
    const logout = () => {auth.logout()}
    const { isAuthenticated } = auth;

    return (
        <Fragment>
            {
                isAuthenticated() &&
                <div className="userMenu">
                    <div className="userDropdown">
                        <button onClick={openMenu} className="userImageButton">
                            <img className="userImage" src={localStorage.getItem('user_image')} alt={localStorage.getItem('name')} />
                        </button>
                        {showMenu ? (
                            <div className="menu">
                                <button>
                                    <Link to="/add"><CookingPot className={'menuImage'} /> Add Recipe</Link>
                                </button>
                                <button>
                                    <PlateUtensils className={'menuImage'} />
                                    My Recipes
                                    </button>
                                <button>
                                    <RecipeBook className={'menuImage'} />
                                    Add Cookbook
                                    </button>
                                <button>
                                    <Bookstack className={'menuImage'} />
                                    My Cookbooks
                                    </button>
                                <button>
                                    <a style={{ cursor: 'pointer' }} onClick={logout}>Log Out</a>
                                </button>
                            </div>
                        ) : (
                                null
                            )
                        }
                    </div>
                </div>
            }
            {
                !isAuthenticated() &&
                <div className="userMenu">
                    <a style={{ cursor: 'pointer' }} onClick={login}>
                        <User className={'userImage'} />
                    </a>
                </div>
            }
        </Fragment>
    )
}

export default UserMenu