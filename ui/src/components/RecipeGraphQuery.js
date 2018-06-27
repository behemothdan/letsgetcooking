import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import '../style/RecipeList.css';

// I will want to limit the results returned as well and implment pagination. Baby steps.
const RECIPE_QUERY = gql`
    query($searchQuery: String = null)
    {
        recipesBySubstring(searchQuery: $searchQuery) {
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

// Eventually I probably want to move out all the display parts to a separate search results component 
// so I can just leave this portion for actuall retrieving search results and deal with it as needed
const RecipeGraphQuery = ({searchQuery}) => (    
    <Query query={RECIPE_QUERY} variables={{searchQuery}}>    
        {({ loading, error, data }) => {            
            if (loading) return( 
                <p>Loading...</p>
            );
            if (error) return (
                <p>Error</p>
            );
            return (                
                <div className="RecipeList">                    
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
                </div>
            );
        }}
    </Query>
);

export default RecipeGraphQuery;