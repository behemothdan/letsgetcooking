import React, { Component, Fragment } from 'react';
import CreateRecipe from 'components/CreateRecipe/CreateRecipe';
import Header from 'components/Header/Header';
import UserMenu from 'components/UserMenu/UserMenu';
import PropTypes from "prop-types";

class RecipeAdd extends Component {
    render() {
        return (
            <Fragment>
                <Header userMenu={<UserMenu />} />
                <main className="container">
                    <div className="content-area">
                        <CreateRecipe />
                    </div>
                </main>
            </Fragment>
        );
    }
}

RecipeAdd.propTypes = {
    auth: PropTypes.object
}

export default RecipeAdd