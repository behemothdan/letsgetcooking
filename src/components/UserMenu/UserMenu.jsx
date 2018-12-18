import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Auth from 'auth';
import PlateUtensils from '../../images/svg-icons/PlateUtensils';
import RecipeBook from '../../images/svg-icons/RecipeBook';
import Bookstack from '../../images/svg-icons/Bookstack';
import CookingPot from '../../images/svg-icons/CookingPot';
import User from '../../images/svg-icons/User';
import './UserMenu.css';

const auth = new Auth();

class UserMenu extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }
    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    login = () => {
        auth.login();
    }
    logout = () => {
        auth.logout();
    }

    render() {
        const { isAuthenticated } = auth;
        return (
            <Fragment>
                {
                    isAuthenticated() &&
                    <div className="userMenu">
                        <div className="userDropdown">
                            <button onClick={this.showMenu} className="userImageButton">
                                <img className="userImage" src={localStorage.getItem('user_image')} alt={localStorage.getItem('name')} />
                            </button>
                            {this.state.showMenu ? (
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
                                        <a style={{ cursor: 'pointer' }} onClick={this.logout}>Log Out</a>
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
                        <a style={{ cursor: 'pointer' }} onClick={this.login}>
                            <User className={'userImage'} />
                        </a>
                    </div>
                }
            </Fragment>
        )
    }
}

export default UserMenu