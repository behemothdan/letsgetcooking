import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import "./CreateIngredient.css";
import Button from '../Button/Button';

const CREATE_INGREDIENT = gql`
    mutation Ingredient($name: String!) {
        CreateIngredient(name: $name) {
            name
        }
    }`;

const CreateIngredient = () => {
    let input;

    return (
        <Mutation mutation={CREATE_INGREDIENT} errorPolicy="none">
            {(CreateIngredient, {loading, error, data}) =>  {
                if(loading) return (
                    <span>Adding that delicious flavor... </span>
                );
                if(error) return (
                    // We'll add the input here eventually. Maybe we abstract the input farther into another component to make it more DRY.
                    // There might be a way to reuse what's below.
                    <pre>Bad: {error.graphQLErrors.map(({ message }, i) => (
                        <span key={i}>{message}</span>
                    ))}
                    </pre>
                );

                return (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                CreateIngredient({variables: {name: input.value}});
                                input.value = "";
                            }}
                        >
                            <input type="text"
                                ref={node => {
                                    input = node;
                                }}
                            />
                            <Button buttonType="submit" buttonValue="Add the flavor!" />
                        </form>
                    </div>
                )
            }}
        </Mutation>
    )
};

export default CreateIngredient