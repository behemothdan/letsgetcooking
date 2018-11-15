import React from 'react';
import RecipeSearchQuery from "components/RecipeSearchQuery/RecipeSearchQuery";
import PropTypes from "prop-types";

const RecipeSingle = ({ recipe }) => {
    return (
        <div>
            <RecipeSearchQuery />
            <div>Hello {recipe}</div>
        </div>
    );
}

RecipeSingle.propTypes = {
    auth: PropTypes.object,
    recipe: PropTypes.string
}

export default RecipeSingle