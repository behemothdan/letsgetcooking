import React, { Component } from 'react';
import Auth from '../../auth';

const auth = new Auth();

class UserMenu extends Component {
    login = () => {
        auth.login();
    }
    logout = () => {
        auth.logout();
    }
    render() {
        const { isAuthenticated } = auth;
        return (
            <div>
                {
                    isAuthenticated() &&
                    <h5>
                        You are logged in!{' '}
                        <a style={{ cursor: 'pointer' }} onClick={this.logout}>Log Out</a>.
                    </h5>
                }
                {
                    !isAuthenticated() &&
                    <h5>
                        You are not logged in! Please{' '}
                        <a style={{ cursor: 'pointer' }} onClick={this.login}>Log In</a>
                        {' '}to continue.
                    </h5>
                }
            </div>
        )
    }
}

export default UserMenu