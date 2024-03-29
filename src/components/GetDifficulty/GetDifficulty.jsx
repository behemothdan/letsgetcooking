import React from 'react';
import Select from 'components/FormComponents/Select/Select';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { GET_DIFFICULTY } from '../../graphql';

const GetDifficulty = ({ onChange, feedback }) => (
    <Query query={GET_DIFFICULTY}>
        {({ loading, error, data }) => {
            if (loading) return (
                <p>Getting suitable challenges...</p>
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
                    optionItems={data.Difficulty}
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