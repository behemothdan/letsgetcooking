import React from "react";
import { Query } from "react-apollo";
import { RECIPE_QUERY } from '../../graphql';
import RecipeSearchResults from "../RecipeSearchResults/RecipeSearchResults";
import PropTypes from "prop-types";

// import { client }  from '../../client';
// import { READ_SEARCHQUERY } from '../../graphql';

// const data = client.readQuery({
//     query: READ_SEARCHQUERY
// })

const RecipeSearchQuery = ({searchQuery}) => (
    <Query query={RECIPE_QUERY} variables={{searchQuery}}>
        {({loading, error, data}) => {
            if (loading) return(
                <p>Finding something delicious...</p>
            );

            if (error) return (
                <p>Ah man! There was nothing to eat.</p>
            );

            return (
                <RecipeSearchResults searchResults={data.RecipesBySubstring} />
            );
        }}
    </Query>
);

RecipeSearchQuery.propTypes = {
    searchQuery: PropTypes.string
}

export default RecipeSearchQuery;