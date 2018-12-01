const {
    neo4jgraphql
} = require("neo4j-graphql-js");
const fs = require('fs');
const path = require('path');

exports.typeDefs = fs.readFileSync(process.env.GRAPHQL_SCHEMA || path.join(__dirname, "schema.graphql")).toString('utf-8');

exports.resolvers = {
    Query: {
        RecipesByExactName: neo4jgraphql,
        RecipeBySlug: neo4jgraphql,
        RecipesBySubstring: neo4jgraphql,
        IngredientsBySubstring: neo4jgraphql,
        UserById: neo4jgraphql
    },
    Mutation: {
        CreateRecipe: neo4jgraphql
    }
};