import React, { Component } from 'react';
import AddIngredient from 'components/AddIngredient/AddIngredient';
import CreateRecipe from 'components/CreateRecipe/CreateRecipe';
import Header from 'components/Header/Header';
import RecipeSearchQuery from "components/RecipeSearchQuery/RecipeSearchQuery";
import UserMenu from 'components/UserMenu/UserMenu';
import PropTypes from "prop-types";

class Home extends Component {
    render() {
        return (
            <div>
                <Header userMenu={<UserMenu />} />
                <main className="container">
                    <div className="content-area">
                        <RecipeSearchQuery />
                        <AddIngredient />
                        <CreateRecipe />
                    </div>
                </main>
            </div>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object
}

export default Home