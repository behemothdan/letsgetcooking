import React, { Component, Fragment } from 'react';
import CreateRecipe from 'components/CreateRecipe/CreateRecipe';
import PropTypes from "prop-types";

class RecipeAdd extends Component {
    render() {
        return (
            <Fragment>
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