import gql from "graphql-tag";

export const GET_DIFFICULTY = gql`
    query
    {
        Difficulty {
            value
        }
    }`;