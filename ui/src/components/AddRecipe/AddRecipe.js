import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Input from "../FormComponents/Input/Input";
import GetMealTypes from "../GetMealTypes/GetMealTypes";

const ADD_RECIPE = gql`
    mutation Recipe (
        $name: String!,
        $time: String,
        $instructions: [String!],
        $ingredients: [Ingredient!],
        $mealtype: MealType!,
        $difficulty: Difficulty!
    ) {
        CreateRecipe(name: $name) {
            name
        }
    }`;

const AddRecipe = () => {
    let recipeName;

    return (
        <Mutation mutation={ADD_RECIPE} errorPolicy="none">
            {(AddRecipe, {loading, error, data}) =>  {
                if(loading) return (
                    <span>Adding that delicious flavor... </span>
                );
                if(error) return (
                    // We'll add the input here eventually.
                    // Maybe we abstract the input farther into another component to make it more DRY.
                    <pre>Bad: {error.graphQLErrors.map(({ message }, i) => (
                        <span key={i}>{message}</span>
                    ))}
                    </pre>
                );

                return (
                    <div>
                        <h2>Add a new recipe!</h2>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                AddRecipe({variables: {name: recipeName.value}});
                                recipeName.value = "";
                            }}
                        >
                            <Input name="recipeName" labelValue="Recipe Name" required="required" />
                            <Input name="time" labelValue="Time" />
                            <GetMealTypes />
                        </form>
                    </div>
                )
            }}
        </Mutation>
    )
}

export default AddRecipe