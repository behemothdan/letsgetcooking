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
  name: String
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
    mealtype(
      type: String      
    ): [MealType]
    ingredients(
      name: String      
    ): [Ingredient]
}
`;

export const resolvers = {
  Query: {
    recipes: neo4jgraphql,
    mealtype: neo4jgraphql,
    ingredients: neo4jgraphql
  }
};
