import React, { Component } from 'react';
import Auth from '../../auth';
import { CREATE_USER } from '../../graphql';
import { graphql, compose } from "react-apollo";
import PropTypes from "prop-types";

const auth = new Auth();

class UserMenu extends Component {
    login = () => {
        auth.login();
    }
    logout = () => {
        auth.logout();
    }
    constructor(props){
        super(props);
        this.handleNewUserCreation = this.handleNewUserCreation.bind(this);
    }

    handleNewUserCreation = () => {
        this.props.CreateUser({variables: {

        }})
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

UserMenu.propTypes = {
    CreateUser: PropTypes.func
}

const UserMenuWithMutations = compose(
    graphql(CREATE_USER, {name: 'CreateUser'}))(UserMenu)

export default UserMenuWithMutations