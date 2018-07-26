import gql from "graphql-tag";

export const CREATE_NEW_RECIPE = gql`
    mutation Recipe (
        $name: String!,
        $time: String,
        $instructions: [String]!
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
        $recipe: String!,
        $quantity: String!,
    ) {
        CreateIngredientRelation(name: $name, recipe: $recipe, quantity: $quantity) {
            name,
            recipe{
                name
            }
            quantity
        }
    }
`;