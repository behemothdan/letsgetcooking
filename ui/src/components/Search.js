import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import '../style/RecipeList.css';

class Search extends React.Component {
    state = {
        query: '',
    }

    render() {
        return (
            <form>
                <input 
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                <p>{this.state.query}</p>
            </form>
        )
    } 
}

const RECIPE_QUERY = gql`
    query recipes($query: String!) {
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
`;

export default Search