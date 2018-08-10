import gql from "graphql-tag";

export const READ_SEARCHQUERY = gql`
    {
        searchQuery {
            query
        }
    }`;