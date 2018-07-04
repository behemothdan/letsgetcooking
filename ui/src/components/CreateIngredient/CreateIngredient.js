import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import "./CreateIngredient.css";

const CREATE_INGREDIENT = gql`
    mutation Ingredient($name: String!) {
        CreateIngredient(name: $name) {
            name
        }
    }`;

const CreateIngredient = () => {
    let input;

    return (
        <Mutation mutation={CREATE_INGREDIENT} errorPolicy="all">
            {(CreateIngredient, {loading, error, data}) => (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            CreateIngredient({variables: {name: input.value}});
                            input.value = "";
                        }}
                    >
                        <input
                            ref={node => {
                                input = node;
                            }}
                        />
                        <button tytpe="submit">Add the flavor!</button>
                    </form>
                </div>
            )}
        </Mutation>
    )
};

export default CreateIngredient