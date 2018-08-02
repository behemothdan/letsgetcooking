import React from "react";
import { Query } from "react-apollo";
import { GET_DIFFICULTY } from '../../graphql';
import Select from "../FormComponents/Select/Select";
import PropTypes from "prop-types";

const GetDifficulty = ({onChange, feedback}) => (
    <Query query={GET_DIFFICULTY}>
        {({loading, error, data}) => {
            if (loading) return(
                <p>So many times to eat...</p>
            );
            if (error) return (
                <p>Oops! We had a problem finding a suitable challenge!</p>
            );

            return (
                <Select
                    name="difficulty"
                    onChange={onChange}
                    feedback={feedback}
                    defaultText="Select a difficulty"
                    optionItems={data.difficulty}
                    optionKey="value"
                />
            );
        }}
    </Query>
);

GetDifficulty.propTypes = {
    onChange: PropTypes.func,
    feedback: PropTypes.string
}

export default GetDifficulty