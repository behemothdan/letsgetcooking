import React, { Component } from 'react';
import Header from '../components/Header/Header';
import RecipeSearchQuery from "../components/RecipeSearchQuery/RecipeSearchQuery";
import UserMenu from '../components/UserMenu/UserMenu';
import PropTypes from "prop-types";

class Recipe extends Component {
    render() {
        return (
            <div>
                <div>
                    <Header userMenu={<UserMenu />} />
                    <div className="container">
                        <div className="content-area">
                            <RecipeSearchQuery />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Recipe.propTypes = {
    auth: PropTypes.object
}

export default Recipe