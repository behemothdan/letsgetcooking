import gql from "graphql-tag";

export const GET_MEALTYPES = gql`
    query
    {
        mealtype {
            type
        }
    }`;