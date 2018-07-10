import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_MEALTYPES = gql`
    query
    {
        mealtype {
            type
        }
    }`;

const GetMealTypes = () => (
    <Query query={GET_MEALTYPES}>
        {({loading, error, data}) => {
            if (loading) return(
                <p>So many times to eat...</p>
            );
            if (error) return (
                <p>Oops! We had a problem finding all the times Hobbits like to eat!</p>
            );

            return (
                <select name="mealTypes">
                    {data.mealtype.map(mealtype => (
                        <option key={mealtype.type} value={mealtype.value}>{mealtype.type}</option>
                    ))}
                </select>
            );
        }}
    </Query>
);

export default GetMealTypes