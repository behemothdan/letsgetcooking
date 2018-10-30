import { neo4jgraphql } from "neo4j-graphql-js";
import fs from 'fs';
import path from 'path';

export const typeDefs = fs.readFileSync(process.env.GRAPHQL_SCHEMA || path.join(__dirname, "schema.graphql")).toString('utf-8');

export const resolvers = {
  Query: {
    RecipesByExactName: neo4jgraphql,
    RecipesBySubstring: neo4jgraphql,
    IngredientsBySubstring: neo4jgraphql,
    UserById: neo4jgraphql
  },
  Mutation: {
    CreateRecipe: neo4jgraphql
  }
};