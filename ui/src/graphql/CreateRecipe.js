import gql from "graphql-tag";

export const CREATE_NEW_RECIPE = gql `
    mutation Recipe (
        $name: String!,
        $time: String!,
        $slug: String!,
        $instructions: [String]!
    ) {
        CreateRecipe(name: $name, time: $time, slug: $slug, instructions: $instructions) {
            name
            time
            slug
            instructions
        }
    }
`;

export const CREATE_RECIPE_INGREDIENTS = gql `
    mutation (
        $ingredient: _IngredientInput!,
        $recipe: _RecipeInput!,
        $quantity: _IngredientsInput!
    ) {
        AddRecipeIngredients(to: $ingredient, from: $recipe, data: $quantity) {
            from {
                name
            }
            to {
                name
            }
            quantity
        }
    }
`;

export const CREATE_USERRECIPE_RELATION = gql `
    mutation (
        $id: _UserInput!,
        $recipe: _RecipeInput!,
        $date: _CreatorInput!
    ) {
        AddRecipeCreator(to: $id, from: $recipe, data: $date) {
            from {
                name
            }
            to {
                id
            }
            date
        }
    }
`;

export const CREATE_DIFFICULTY_RELATION = gql `
    mutation (
        $recipe: _RecipeInput!,
        $value: _DifficultyInput!
    ) {
        AddRecipeDifficulty(from: $recipe, to:$value) {
            from {
                name
            }
            to {
                value
            }
        }
    }
`;

export const CREATE_MEALTYPE_RELATION = gql `
    mutation (
        $recipe: _RecipeInput!,
        $type: _MealTypeInput!
    ) {
        AddRecipeMealtype(from: $recipe, to: $type) {
            from {
                name
            }
            to {
                type
            }
        }
    }
`;