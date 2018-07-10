import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import RecipeSearchResults from "../RecipeSearchResults/RecipeSearchResults";

// I will want to limit the results returned as well and implment pagination. Baby steps.
const RECIPE_QUERY = gql`
    query($searchQuery: String = "null")
    {
        RecipesBySubstring(searchQuery: $searchQuery) {
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

const RecipeSearchQuery = ({searchQuery}) => (
    <Query query={RECIPE_QUERY} variables={{searchQuery}}>
        {({loading, error, data}) => {
            if (loading) return(
                <p>Finding deliciousness...</p>
            );
            if (error) return (
                <p>Error</p>
            );

            return (
                <RecipeSearchResults searchResults={data.RecipesBySubstring} />
            );
        }}
    </Query>
);

export default RecipeSearchQuery;