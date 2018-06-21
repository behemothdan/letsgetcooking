import React from "react";
import PropTypes from 'prop-types';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import '../style/RecipeList.css';

const RECIPE_QUERY = gql`query recipes{
    recipes {
        name
        time
        instructions
        ingredients {
            name
            quantity
        }
        mealtype {
            type
        }
        difficulty {
            value
        }
    }
}`;

const RecipeList2 = ({ queryString }) => (
    <Query query={RECIPE_QUERY} variables={{ queryString }}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error</p>;

            return (
                <div className="RecipeList">
                    <h1>Recipes:</h1>
                    {data.recipes.map(recipe => (
                    <div key={recipe.name}>
                        <h3>{recipe.name}</h3>
                        <ul>
                        {recipe.instructions.map(y => {
                            return <li key={y}>{y}</li>
                        })}
                        <ul>
                        {recipe.ingredients.map(i => {
                            return <li key={i.name}>{i.quantity} {i.name}</li>
                        })} 
                        </ul>                                                                  
                        <li>Time: {recipe.time}</li>
                        <li>Dish Type: {recipe.mealtype.type}</li>
                        <li>Difficulty: {recipe.difficulty.value}</li>
                        </ul>
                    </div>
                    ))}
                </div>
            )
        }}
    </Query>
);

RecipeList2.propTypes = { queryString: PropTypes.string };
RecipeList2.defaultProps = { queryString: 'spaghetti' };

export default Query(RECIPE_QUERY)(RecipeList2)