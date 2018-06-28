import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

// This is an attempt to load the search results from the apollo-link-state which is kind
// of a replacement for using React state.
const GET_LAST_SEARCH_RESULTS = gql`        
    query
    {
        recipesInCache @client {
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

const RecipeSearchResults = () => (
    <Query query={GET_LAST_SEARCH_RESULTS}>    
        {({ loading, error, data }) => {
            if (loading) return( 
                <p>Finding deliciousness...</p>
            );
            if (error) return (
                <p>{error.toString()}</p>
            );            
            return (      
                <div>{data}</div>                                    
                /*<div className="RecipeList">                    
                    <h1>Recipes:</h1>
                    {data.recipesBySubstring.map(recipe => (
                        <div key={recipe.name}>
                            <h3>{recipe.name}</h3>
                            <ul>
                                {recipe.instructions.map(y => {
                                return <li key={y}>{y}</li>
                                })}
                                <ul key={recipe.ingredients}>
                                    {recipe.ingredients.map(i => {
                                        return <li key={recipe.name + i.name}>{i.quantity} {i.name}</li>
                                    })} 
                                </ul>                                                                  
                                <li>Time: {recipe.time}</li>
                                <li>Dish Type: {recipe.mealtype.type}</li>
                                <li>Difficulty: {recipe.difficulty.value}</li>
                            </ul>
                        </div>
                    ))}          
                </div>*/
            );
        }}
    </Query>
)

export default RecipeSearchResults