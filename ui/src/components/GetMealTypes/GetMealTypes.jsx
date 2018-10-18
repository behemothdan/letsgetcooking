import React from "react";
import { Query } from "react-apollo";
import { GET_MEALTYPES } from '../../graphql';
import Select from "../FormComponents/Select/Select";
import PropTypes from "prop-types";

const GetMealTypes = ({onChange, feedback}) => (
    <Query query={GET_MEALTYPES}>
        {({loading, error, data}) => {
            if (loading) return(
                <p>So many things to eat...</p>
            );
            if (error) return (
                <p>Oops! We had a problem finding all the things Hobbits like to eat!</p>
            );

            return (
                <Select
                    name="mealtype"
                    onChange={onChange}
                    feedback={feedback}
                    defaultText="What kind of food is it?"
                    optionItems={data.MealType}
                    optionKey="type"
                />
            );
        }}
    </Query>
);

GetMealTypes.propTypes = {
    onChange: PropTypes.func.isRequired,
    feedback: PropTypes.string
}

export default GetMealTypes