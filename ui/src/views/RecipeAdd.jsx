import React, { Component } from 'react';
import CreateRecipe from 'components/CreateRecipe/CreateRecipe';
import Header from 'components/Header/Header';
import UserMenu from 'components/UserMenu/UserMenu';
import PropTypes from "prop-types";

class RecipeAdd extends Component {
    render() {
        return (
            <div>
                <Header userMenu={<UserMenu />} />
                <main className="container">
                    <div className="content-area">
                        <CreateRecipe />
                    </div>
                </main>
            </div>
        );
    }
}

RecipeAdd.propTypes = {
    auth: PropTypes.object
}

export default RecipeAdd