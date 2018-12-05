import React, { Component, Fragment } from 'react';
import { IconContext } from 'react-icons';
import { IoMdContact } from 'react-icons/io';
import Auth from 'auth';
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
                                        Add Recipe
                                    </button>
                                    <button>
                                        My Recipes
                                    </button>
                                    <button>
                                        Add Cookbook
                                    </button>
                                    <button>
                                        My Cookbooks
                                    </button>
                                    <button>
                                        <a style={{ cursor: 'pointer' }} onClick={this.logout}>Log Out</a>.
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
                            <IconContext.Provider value={{ className: "userImage" }}>
                                <IoMdContact />
                            </IconContext.Provider>
                        </a>
                    </div>
                }
            </Fragment>
        )
    }
}

export default UserMenu