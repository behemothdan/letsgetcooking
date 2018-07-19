import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import "./AddIngredient.css";
import Button from "../FormComponents/Button/Button";

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
                    // We need to add much more robust, user-friendly error handling.
                    <pre>Bad: {error.graphQLErrors.map(({ message }, i) => (
                        <span key={i}>{message} - {data}</span>
                    ))}
                    </pre>
                );

                return (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                CreateIngredient({variables: {name: input.value}});
                            }}
                        >
                            <input type="text" required="true"
                                ref={node => input = node}
                            />
                            <Button type="submit" value="Add the flavor!" />
                        </form>
                    </div>
                )
            }}
        </Mutation>
    )
};

export default CreateIngredient