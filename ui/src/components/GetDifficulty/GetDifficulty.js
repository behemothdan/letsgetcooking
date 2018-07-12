import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_DIFFICULTY = gql`
    query
    {
        difficulty {
            value
        }
    }`;

const GetDifficulty = ({onChange}) => (
    <Query query={GET_DIFFICULTY}>
        {({loading, error, data}) => {
            if (loading) return(
                <p>So many times to eat...</p>
            );
            if (error) return (
                <p>Oops! We had a problem finding a suitable challenge!</p>
            );

            return (
                <select name="difficulties" onChange={onChange}>
                        <option key="no-difficulty" value="">Select a difficulty</option>
                    {data.difficulty.map(difficulty => (
                        <option key={difficulty.value} value={difficulty.value}>{difficulty.value}</option>
                    ))}
                </select>
            );
        }}
    </Query>
);

export default GetDifficulty