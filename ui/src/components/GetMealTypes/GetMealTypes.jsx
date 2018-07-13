import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Select from "../FormComponents/Select/Select";

const GET_MEALTYPES = gql`
    query
    {
        mealtype {
            type
        }
    }`;

const GetMealTypes = ({onChange}) => (
    <Query query={GET_MEALTYPES}>
        {({loading, error, data}) => {
            if (loading) return(
                <p>So many things to eat...</p>
            );
            if (error) return (
                <p>Oops! We had a problem finding all the things Hobbits like to eat!</p>
            );

            return (
                <div>
                {/*<select name="mealtype" onChange={onChange}>
                        <option key="no-mealtype" value="">What kind of food is this?</option>
                    {data.mealtype.map(mealtype => (
                        <option key={mealtype.type} value={mealtype.type}>{mealtype.type}</option>
                    ))}
                </select>*/}
                    <Select name="mealtype" onChange={onChange} defaultText="What kind of food is it?" optionItems={data.mealtype} />
                </div>
            );
        }}
    </Query>
);

export default GetMealTypes