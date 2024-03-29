import React, { Fragment } from 'react';
import { RECIPE_SLUG } from '../../graphql';
import { Query } from 'react-apollo';
import { feedbackMessages } from '../../utilities';
import PropTypes from "prop-types";

const RecipeSingle = ({ recipe }) => {
    return (
        <Fragment>
            <Query query={RECIPE_SLUG} variables={{ slugQuery: recipe }}>
                {({ loading, error, data }) => {
                    if (loading) return (
                        <p>{ feedbackMessages.loading }</p>
                    );

                    if (error) return (
                        <p>{ feedbackMessages.loadingFailed }</p>
                    );

                    if (data.RecipeBySlug !== null && data.RecipeBySlug.length !== 0) {
                        return (
                            <div>
                                <h3>{data.RecipeBySlug.name}</h3>
                                <ul>
                                    {data.RecipeBySlug.instructions.map(instruction => {
                                        return <li key={instruction}>{instruction}</li>
                                    })}
                                </ul>
                                <ul>
                                    {data.RecipeBySlug.ingredients.map(i => {
                                        return <li key={data.RecipeBySlug.name + "-" + i.Ingredient.name}>{i.Ingredient.quantity} {i.Ingredient.name}</li>
                                    })}
                                </ul>
                                <ul>
                                    <li>Time: <time>{data.RecipeBySlug.time}</time></li>
                                    <li>Dish Type:
                                    {
                                            data.RecipeBySlug.mealtype === null || '' ? "None selected" : data.RecipeBySlug.mealtype.type
                                        }
                                    </li>
                                    <li>Difficulty:
                                    {
                                            data.RecipeBySlug.difficulty === null || '' ? "Difficulty not selected" : data.RecipeBySlug.difficulty.value
                                        }
                                    </li>
                                    <li>Created By:
                                    {
                                            data.RecipeBySlug.creator === null ? '' : data.RecipeBySlug.creator.User.name
                                        }
                                    </li>
                                </ul>
                            </div>
                        );
                    } else {
                        return (
                            <p>{ feedbackMessages.recipeNotFound }</p>
                        )
                    }
                }}
            </Query>
        </Fragment>
    );
}

RecipeSingle.propTypes = {
    auth: PropTypes.object,
    recipe: PropTypes.string
}

export default RecipeSingle