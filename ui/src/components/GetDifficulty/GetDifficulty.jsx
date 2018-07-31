import React from "react";
import { Query } from "react-apollo";
import { GET_DIFFICULTY } from '../../graphql';
import PropTypes from "prop-types";

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
                <select name="difficulty" onChange={onChange}>
                        <option key="no-difficulty" value="">Select a difficulty</option>
                    {data.difficulty.map(difficulty => (
                        <option key={difficulty.value} value={difficulty.value}>{difficulty.value}</option>
                    ))}
                </select>
            );
        }}
    </Query>
);

GetDifficulty.propTypes = {
    onChange: PropTypes.func
}

export default GetDifficulty