import gql from "graphql-tag";

export const CREATE_RECIPE = gql`
    mutation Recipe (
        $name: String!,
        $time: String,
        $instructions: [String]!,
    ) {
        CreateRecipe(name: $name, time: $time, instructions: $instructions) {
            name
            time
            instructions
        }
    }
`;

export const CREATE_RECIPE_INGREDIENTS = gql`
    mutation (
        $name: String!,
        $recipeName: String!,
        $quantity: String!,
    ) {
        CreateIngredientRelation(name: $name, recipeName: $recipeName, quantity: $quantity) {
            name,
            recipeName,
            quantity
        }
    }
`;