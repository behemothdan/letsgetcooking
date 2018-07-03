import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import '../style/RecipeList.css';

import './DisplaySearchResults';
import DisplaySearchResults from "./DisplaySearchResults";

// I will want to limit the results returned as well and implment pagination. Baby steps.
const RECIPE_QUERY = gql`
    query($searchQuery: String = "null")
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

const RecipeGraphQuery = ({searchQuery}) => (
    <Query query={RECIPE_QUERY} variables={{searchQuery}}>
        {({ loading, error, data, client }) => {
            if (loading) return(
                <p>Finding deliciousness...</p>
            );
            if (error) return (
                <p>Error</p>
            );

            // This part is successfully saving recipes on initial load to the local apollo link state
            // This can be an alternative to ever introducing Redux it seems.
            client.writeData({ data: {recipesBySubstring: data.recipesBySubstring}})

            return (
                <DisplaySearchResults searchResults={data.recipesBySubstring} />
            );
        }}
    </Query>
);

export default RecipeGraphQuery;