import React from "react";
import "./RecipeSearchResults.css";
import PropTypes from "prop-types";

const RecipeSearchResults = ({searchResults}) => {
    return (
        <div className="RecipeList">
            {searchResults.map(recipe => (
                <div key={recipe.name}>
                    <h3>{recipe.name}</h3>
                    <ul>
                        {recipe.instructions.map(y => {
                        return <li key={y}>{y}</li>
                        })}
                    </ul>
                    <ul key={recipe.ingredients}>
                        {recipe.ingredients.map(i => {
                            return <li key={recipe.name + i.name}>{i.quantity} {i.name}</li>
                        })}
                    </ul>
                    <ul>
                        <li>Time: {recipe.time}</li>
                        <li>Dish Type: {recipe.mealtype.type}</li>
                        <li>Difficulty: {recipe.difficulty.value}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

RecipeSearchResults.propTypes = {
    searchResults: PropTypes.array
}

export default RecipeSearchResults