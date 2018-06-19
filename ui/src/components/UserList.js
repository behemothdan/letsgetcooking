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
              <div>
                <h3>{recipe.name}</h3>
                <ul>
                  <li>{recipe.instructions}</li>
                  <li>{recipe.ingredients[0].name}</li>
                  <li>{recipe.time}</li>
                  <li>{recipe.mealtype.type}</li>
                  <li>{recipe.difficulty.value}</li>
                </ul>
              </div>
            ))}          
        </div>
      );
    }}
  </Query>
);

export default RecipeList;
