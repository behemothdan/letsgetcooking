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
                        {recipe.instructions.map(instruction => {
                            return <li key={instruction}>{instruction}</li>
                        })}
                    </ul>
                    <ul key={recipe.ingredients}>
                        {recipe.ingredients.map(i => {
                            return <li key={recipe.name + "-" + i.Ingredient.name}>{i.Ingredient.quantity} {i.Ingredient.name}</li>
                        })}
                    </ul>
                    <ul>
                        <li>Time: {recipe.time}</li>
                        <li>Dish Type:
                            {
                                recipe.mealtype === null || '' ? "None selected" : recipe.mealtype.type
                            }
                        </li>
                        <li>Difficulty:
                            {
                                recipe.difficulty === null || '' ? "Difficulty not selected" : recipe.difficulty.value
                            }
                        </li>
                        <li>Created By:
                            {
                                recipe.creator.User.name === null || '' ? '' : recipe.creator.User.name
                            }
                        </li>
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