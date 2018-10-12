import { neo4jgraphql } from "neo4j-graphql-js";
import fs from 'fs';
import path from 'path';

export const typeDefs = fs.readFileSync(process.env.GRAPHQL_SCHEMA || path.join(__dirname, "schema.graphql")).toString('utf-8');

export const resolvers = {
  Query: {
    recipes: neo4jgraphql,
    users: neo4jgraphql,
    mealtype: neo4jgraphql,
    ingredients: neo4jgraphql,
    difficulty: neo4jgraphql,
    RecipesByExactName: neo4jgraphql,
    RecipesBySubstring: neo4jgraphql,
    IngredientsBySubstring: neo4jgraphql,
    UserById: neo4jgraphql
  },
  Mutation: {
    CreateIngredient: neo4jgraphql,
    CreateUser: neo4jgraphql,
    CreateRecipe: neo4jgraphql,
    CreateIngredientRelation: neo4jgraphql,
    CreateMealTypeRelation: neo4jgraphql,
    CreateDifficultyRelation: neo4jgraphql,
    CreateUserRecipeRelation: neo4jgraphql
  }
};