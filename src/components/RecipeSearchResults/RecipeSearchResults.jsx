import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RecipeSearchResults.css';

const RecipeSearchResults = ({ searchResults }) => {
    return (
        <article className="RecipeList">
            {searchResults.map(recipe => (
                <div key={recipe.name}>
                    <h3>
                        <Link to={`/recipe/${recipe.slug}`}>{recipe.name}</Link>
                    </h3>

                    <ul>
                        <li>Time: <time>{recipe.time}</time></li>
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
                                recipe.creator === null ? '' : recipe.creator.User.name
                            }
                        </li>
                    </ul>
                </div>
            ))}
        </article>
    );
}

RecipeSearchResults.propTypes = {
    searchResults: PropTypes.array
}

export default RecipeSearchResults