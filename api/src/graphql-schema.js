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

type User {
  name: String
  id: String!
  given_name: String
  email: String
}

type Ingredient {
  name: String!
  quantity: String @cypher(statement:"MATCH (:Recipe)-[c:Contains]-(this) RETURN q.quantity")
  recipe: Recipe
}

type MealType {
  type: String
  recipe: Recipe
}

type Difficulty {
  value: String
  recipe: Recipe
}

type Query {
  recipes (
    name: String,
    time: String,
    instructions: [String],
    ingredients: [String],
    mealtype: String,
    difficulty: String
  ): [Recipe]

  users (
    name: String
    id: String
    given_name: String
    email: String
  ): [User]

  mealtype (
    type: String
  ): [MealType]

  difficulty (
    value: String
  ): [Difficulty]

  ingredients (
    name: String
  ): [Ingredient]

  RecipesByExactName(searchQuery: String): [Recipe] @cypher(statement:
    "MATCH (r:Recipe {name: toLower($searchQuery)}) return r")

  RecipesBySubstring(searchQuery: String): [Recipe] @cypher(statement:
    "MATCH (r:Recipe) WHERE toLower(r.name) CONTAINS toLower($searchQuery) OR toLower(r.time) CONTAINS toLower($searchQuery) RETURN r ORDER BY r.name ASC")

  IngredientsBySubstring(ingredientQuery: String): [Ingredient] @cypher(statement:
    "MATCH (i:Ingredient) WHERE toLower(i.name) CONTAINS toLower($ingredientQuery) RETURN i")

  UserById(id: String): [User] @cypher(statement:
    "MATCH (u:User {id: $id}) return u")
}

type Mutation {
  CreateRecipe (
    name: String
    time: String
    instructions: [String]
  ): Recipe

  CreateUser (
    name: String
    id: String
    given_name: String
    email: String
  ): User

  CreateIngredient (
    name: String
  ): Ingredient

  CreateIngredientRelation (
    name: String
    recipe: String
    quantity: String
  ): Ingredient @cypher(statement:
    "MATCH (r:Recipe{name:$recipe}), (i:Ingredient{name:$name}) CREATE (r)-[c:Contains{quantity:$quantity}]->(i) RETURN r,c,i")

  CreateUserRecipeRelation (
    id: String
    recipeName: String
    date: String
  ): User @cypher(statement:
    "MATCH (r:Recipe{name:$recipeName}), (u:User{id:$id}) CREATE (r)-[c:Created_By]->(u) RETURN r,c,u")

  CreateDifficultyRelation (
    value: String
    recipe: String
  ): Difficulty @cypher(statement:
    "MATCH (r:Recipe{name:$recipe}), (d:Difficulty{value:$value}) CREATE (r)-[s:Skill_Level]->(i) RETURN r,s,d")

  CreateMealTypeRelation (
    type: String
    recipe: String
  ): MealType @cypher(statement:
    "MATCH (r:Recipe{name:$recipe}), (m:MealType{type:$type}) CREATE (r)-[t:Type_Of]->(m) RETURN r,t,m")
}
`;

export const resolvers = {
  Query: {
    recipes(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    users(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    mealtype(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    ingredients(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    difficulty(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    RecipesByExactName(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    RecipesBySubstring(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    IngredientsBySubstring(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    UserById(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    }
  },
  Mutation: {
    CreateIngredient(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    CreateUser(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    CreateRecipe(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    CreateIngredientRelation(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    CreateDifficultyRelation(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    CreateMealTypeRelation(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    CreateUserRecipeRelation(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    }
  }
};