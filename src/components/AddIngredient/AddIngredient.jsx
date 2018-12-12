import React from 'react';
import './AddIngredient.css';
import Button from 'components/FormComponents/Button/Button';
import { Mutation } from 'react-apollo';
import { CREATE_INGREDIENT } from '../../graphql';

const CreateIngredient = () => {
    let input;

    return (
        <Mutation mutation={CREATE_INGREDIENT} errorPolicy="none">
            {(CreateIngredient, { loading, error, data }) => {
                if (loading) return (
                    <span>Adding that delicious flavor... </span>
                );
                if (error) return (
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
                                CreateIngredient({ variables: { name: input.value.toLowerCase() } });
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