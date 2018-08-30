import React, { Component } from 'react';
import AddIngredient from '../components/AddIngredient/AddIngredient';
import CreateRecipe from '../components/CreateRecipe/CreateRecipe';
import Header from '../components/Header/Header';
import RecipeSearchQuery from "../components/RecipeSearchQuery/RecipeSearchQuery";

class Home extends Component {
    // calls the login method in authentication service
    login = () => {
        this.props.auth.login();
    }
    // calls the logout method in authentication service
    logout = () => {
        this.props.auth.logout();
    }
    render() {
        // calls the isAuthenticated method in authentication service
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                {
                    isAuthenticated() &&
                    <div>
                        <h5>
                            You are logged in!{' '}
                            <a
                                style={{ cursor: 'pointer' }}
                                onClick={this.logout}
                            >
                                Log Out
                            </a>.
                        </h5>
                        <div>
                            <Header />
                            <div className="container">
                                <div className="content-area">
                                    <RecipeSearchQuery />
                                    <AddIngredient />
                                    <CreateRecipe />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    !isAuthenticated() && (
                        <div>
                            <Header />
                            <h5>
                                You are not logged in! Please{' '}
                                <a
                                    style={{ cursor: 'pointer' }}
                                    onClick={this.login}
                                >
                                    Log In
                            </a>
                                {' '}to continue.
                            </h5>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Home