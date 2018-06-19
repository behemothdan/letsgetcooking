import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import '../style/UserList.css';

const UserList = () => (
  <Query
    query={gql`
      {
        recipes {
          name
          time
          instructions
          ingredients {
            name
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
        <div className="UserList">
          <h1>Recipes:</h1>
          
          <ul>          
            {data.recipes.map(({name}, i) => (
              <li key={i}>{name} -</li>		  
            ))}
          </ul>
        </div>
      );
    }}
  </Query>
);

export default UserList;
