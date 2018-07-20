import { neo4jgraphql } from "neo4j-graphql-js";

export const typeDefs = `
type Recipe {
	name: String
	time: String
  instructions: [String]
  ingredients: [Ingredient] @relation(name: "Contains", direction: "OUT")
  mealtype: MealType @relation(name: "Type_Of", direction:"OUT")
  difficulty: Difficulty @relation(name: "Skill_Level", direction: "OUT")
}

type Ingredient {
  name: String!
  quantity: String @cypher(statement:"MATCH (:Recipe)-[c:Contains]-(this) RETURN c.quantity")
}

type MealType {
  type: String
}

type Difficulty {
  value: String
}

type Query {
  recipes(
    name: String,
    time: String,
    instructions: [String],
    ingredients: [String],
    mealtype: String,
    difficulty: String
  ): [Recipe]

  RecipesBySubstring(searchQuery: String): [Recipe] @cypher(statement:
    "MATCH (r:Recipe) WHERE toLower(r.name) CONTAINS toLower($searchQuery) OR toLower(r.time) CONTAINS toLower($searchQuery) RETURN r" )

  IngredientsBySubstring(ingredientQuery: String): [Ingredient] @cypher(statement:
    "MATCH (i:Ingredient) WHERE toLower(i.name) CONTAINS toLower($ingredientQuery) RETURN i" )

  mealtype(
    type: String
  ): [MealType]

  difficulty(
    value: String
  ): [Difficulty]

  ingredients(
    name: String
  ): [Ingredient]
}
`;

export const resolvers = {
  Query: {
    recipes(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    RecipesBySubstring(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    IngredientsBySubstring(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    difficulty(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    mealtype(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    ingredients(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    }
  }
};