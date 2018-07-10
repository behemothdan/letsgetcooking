import React, {Component} from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { debounce } from "lodash";
import GetDifficulty from "../GetDifficulty/GetDifficulty";
import GetMealTypes from "../GetMealTypes/GetMealTypes";

import Button from "../FormComponents/Button/Button";
import Input from "../FormComponents/Input/Input";

const ADD_RECIPE = gql`
    mutation Recipe (
        $recipeName: String!,
        $time: String,
        $instructions: [String!],
        $ingredients: [Ingredient!],
        $mealtype: MealType!,
        $difficulty: Difficulty!
    ) {
        CreateRecipe(name: $recipeName, time: $time) {
            name
            time
        }
}`;

class AddRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            time: '',
            instructions: {},
            ingredients: {},
            mealtype: '',
            difficulty: ''
        }
        this.handleChange = debounce(this.handleChange.bind(this), 500);
    };

    handleChange(e){
        console.log(e.target.name);
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value}, () => {
            this.props.handleChange([value]);
        });
    };


    render() {
        return (
            <Mutation mutation={ADD_RECIPE} errorPolicy="none">
                {(AddRecipe, {loading, error, data}) =>  {
                    if(loading) return (
                        <span>Adding that delicious flavor... </span>
                    );
                    if(error) return (
                        <pre>Bad: {error.graphQLErrors.map(({ message }, i) => (
                            <span key={i}>{message}</span>
                        ))}
                        </pre>
                    );

                    return (
                        <div>
                            <h2>Add a new recipe!</h2>
                            <form>
                                <Input
                                    name={'recipeName'}
                                    labelValue={'Recipe Name'}
                                    required={'required'}
                                    placeholder={'Recipe Name'}
                                    value={this.state.name}
                                />
                                <Input
                                    name={'time'}
                                    labelValue={'Time'}
                                    required={''}
                                    placeholder={'How long till eating?'}
                                    value={this.state.time}
                                />
                                <GetMealTypes />
                                <GetDifficulty />
                                <Button buttonType="submit" buttonValue="Add that delicious recipe!" />
                            </form>
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}

export default AddRecipe