import React, {Component} from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import GetDifficulty from "../GetDifficulty/GetDifficulty";
import GetMealTypes from "../GetMealTypes/GetMealTypes";

import Button from "../FormComponents/Button/Button";
import Input from "../FormComponents/Input/Input";
import Textbox from "../FormComponents/Textbox/Textbox";
import List from "../List/List";

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
            ingredient: '', // This is only used to temporarily hold the ingredient until it is added to the array below
            quantity: '', // The same is true for this as it is for the item above
            instruction: '', // Same as above
            name: '',
            time: '',
            instructions: {},
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

    addInstruction = () => {
        const newInstruction = this.state.instruction;
        this.setState((state) => ({
            instructions: [...state.instructions, newInstruction],
            instruction: ''
        }), () => {
            //console.log(this.state.instructions);
        })
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
                                <Input
                                    name="ingredient"
                                    value={this.state.ingredient}
                                    labelValue="Ingredient"
                                    required="false"
                                    className="ingredientinput"
                                    onChange={this.onInputChange}
                                />
                                {this.state.ingredients.map(t => <List key={t.name + t.quantity} {...t} />)}
                                <Input
                                    name="quantity"
                                    value={this.state.quantity}
                                    labelValue="Quantity"
                                    required="false"
                                    className="quantityinput"
                                    onChange={this.onInputChange}
                                />
                                <Button buttonType="button" buttonValue="Add Ingredient" buttonClick={this.addIngredient} />
                                <Textbox
                                    name="instruction"
                                    value={this.state.instruction}
                                    labelValue="Instruction"
                                    required="false"
                                    className="instructionbox"
                                    row="4"
                                    onChange={this.onInputChange}
                                />
                                <Button buttonType="button" buttonValue="Add Step" buttonClick={this.addInstruction} />

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