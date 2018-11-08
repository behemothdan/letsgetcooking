import React, { Component } from "react";
import RecipeSearchResults from "../RecipeSearchResults/RecipeSearchResults";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { RECIPE_QUERY } from '../../graphql';
import { READ_SEARCHQUERY } from '../../graphql';
import { graphql, compose } from "react-apollo";

class RecipeSearchQuery extends Component {
    render() {
        const { searchQuery: { query } } = this.props;
        return (
            <Query query={RECIPE_QUERY} variables={{ searchQuery: query }}>
                {({ loading, error, data }) => {
                    if (loading) return (
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
        )
    }
}

RecipeSearchQuery.propTypes = {
    searchQuery: PropTypes.object
}

export default compose(
    graphql(READ_SEARCHQUERY, {
        props: ({ data: { searchQuery } }) => ({
            searchQuery
        })
    })
)(RecipeSearchQuery)