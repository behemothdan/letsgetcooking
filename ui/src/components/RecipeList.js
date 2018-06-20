import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import '../style/RecipeList.css';

const RecipeList = () => (
  <Query
    query={gql`
      {
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
      }
    `}
  >
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
                  <li>{recipe.instructions}</li>
                  return {[...Array(recipe.ingredients)].map((ingredient,index) => {
                    return <li key={index}>{ingredient[index].quantity} {ingredient[index].name}</li>
                  })}                                                                     
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

export default RecipeList;
