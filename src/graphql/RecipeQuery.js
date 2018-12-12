import gql from "graphql-tag";

export const RECIPE_QUERY = gql `
    query($searchQuery: String = "null")
    {
        RecipesBySubstring(searchQuery: $searchQuery) {
            name
            time
            mealtype {
                type
            }
            difficulty {
                value
            }
            creator {
                User {
                    name
                }
            }
            slug
        }
    }`;

export const RECIPE_EXACT = gql `
    query($searchQuery: String = "null")
    {
        RecipesByExactName(searchQuery: $searchQuery) {
            name
        }
    }`;

export const RECIPE_SLUG = gql `
    query($slugQuery: String = "null")
    {
        RecipeBySlug(slugQuery: $slugQuery) {
            name
            time
            instructions
            ingredients {
                Ingredient {
                    name
                    quantity
                }
            }
            mealtype {
                type
            }
            difficulty {
                value
            }
            creator {
                User {
                    name
                }
            }
        }
    }`;