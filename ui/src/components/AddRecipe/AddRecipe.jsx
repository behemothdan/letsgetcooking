import React, {Component} from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
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
        CreateRecipe(name: $recipeName, time: $time, mealtype: $mealtype, difficulty: $difficulty) {
            name
            time
            mealtype
            difficulty
        }
}`;

class AddRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            time: '',
            instructions: {},
            ingredient: '', // This is only used to temporarily hold the ingredient until it is added to the array below
            quantity: '', // The same is true for this as it is for the item above
            ingredients: [{name:"", quantity:""}],
            mealtype: '',
            difficulty: ''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
    }

    onInputChange(event){
        // As long as the name of the input component matches the name of the state property
        // this will add them to the appropriate keys.
        const stateName = event.target.name;
        const value = event.target.value;
        this.setState(({[stateName]: value}), () => {
            // In other components this calls back to the parent
            // We can probably use this for something else like some kind of validation
            // since it is called after the setState is finished or simplify it:
            // this.setState(s => ({[stateName]: value}))
            //console.log(value);
        });
    }

    addIngredient = () => {
        const newIngredient = {
            name: this.state.ingredient,
            quantity: this.state.quantity
        }
        this.setState((state) => ({
            ingredients: [...state.ingredients, newIngredient],
            ingredient: '',
            quantity: ''
        }), () => {
            //console.log(this.state.ingredients);
        });
    }

    removeIngredient(name,quantity) {
        this.setState(state => {
            return {
                ingredients: state.ingredients.map(ingredient => {
                    if(ingredient.name !== name || ingredient.quantity !== quantity){
                        return ingredient;
                    } else {
                        return {
                            ...ingredient, deleted: true
                        }
                    }
                })
            }
        })
    }

    render() {
        return (
            <Mutation mutation={ADD_RECIPE} errorPolicy="none">
                {(AddRecipe, {loading, error}) =>  {
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
                                    name="name"
                                    labelValue="Recipe Name"
                                    required="true"
                                    placeholder="Recipe Name"
                                    value={this.state.name}
                                    onChange={this.onInputChange}
                                />
                                <Input
                                    name="time"
                                    labelValue="Time"
                                    required="false"
                                    placeholder="How long till eating?"
                                    value={this.state.time}
                                    onChange={this.onInputChange}
                                />
                                <GetMealTypes
                                    value={this.state.mealtype}
                                    onChange={this.onInputChange}
                                />
                                <GetDifficulty
                                    value={this.state.difficulty}
                                    onChange={this.onInputChange}
                                />

                                <Button buttonType="button" buttonValue="Add Ingredient" buttonClick={this.addIngredient} />

                                <div>
                                    <Input
                                        name="ingredient"
                                        value={this.state.ingredient}
                                        labelValue="Ingredient"
                                        required="true"
                                        className="ingredient"
                                        onChange={this.onInputChange}
                                    />
                                    <Input
                                        name="quantity"
                                        value={this.state.quantity}
                                        labelValue="Quantity"
                                        required="true"
                                        className="quantity"
                                        onChange={this.onInputChange}
                                    />
                                </div>
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