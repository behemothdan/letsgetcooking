import gql from "graphql-tag";

export const GET_MEALTYPES = gql`
    query
    {
        MealType {
            type
        }
    }`;