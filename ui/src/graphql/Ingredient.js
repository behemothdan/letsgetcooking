import gql from "graphql-tag";

export const CREATE_INGREDIENT = gql`
    mutation Ingredient($name: String!) {
        CreateIngredient(name: $name) {
            name
        }
    }`;

export const INGREDIENTS = gql`
    query($ingredientQuery: String = "null")
    {
        Ingredient(name: $ingredientQuery) {
            name
        }
    }`;