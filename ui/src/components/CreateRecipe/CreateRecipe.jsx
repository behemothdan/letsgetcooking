import React, {Component} from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import Button from "../FormComponents/Button/Button";
import GetDifficulty from "../GetDifficulty/GetDifficulty";
import GetMealTypes from "../GetMealTypes/GetMealTypes";
import Input from "../FormComponents/Input/Input";
import Textbox from "../FormComponents/Textbox/Textbox";

const CREATE_RECIPE = gql`
    mutation Recipe (
        $name: String!,
        $time: String,
        $instructions: [String]!,
    ) {
        CreateRecipe(name: $name, time: $time, instructions: $instructions) {
            name
            time
            instructions
        }
    }
`;

class CreateRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredient: '', // This is only used to temporarily hold the ingredient until it is added to the array below
            quantity: '', // The same is true for this as it is for the item above
            instruction: '', // Same as above
            name: '',
            time: '',
            instructions: [],
            ingredients: [],
            mealtype: '',
            difficulty: ''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.addInstruction = this.addInstruction.bind(this);
        this.removeInstruction = this.removeInstruction.bind(this);
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
            quantity: this.state.quantity,
            id: this.guid()
        }
        this.setState((state) => ({
            ingredients: [...state.ingredients, newIngredient],
            ingredient: '',
            quantity: ''
        }), () => {
            // Refer to onInputChange for thoughts on this section
            //console.log(this.state.ingredients);
        });
    }

    // I am sure there is going to be a nice easy way to combine removeIngredient and removeInstruction but for now they are separate
    removeIngredient(id) {
        this.setState(state => {
            return {
                ingredients: state.ingredients.map(ingredient => {
                    if(ingredient.id !== id){
                        return ingredient
                    } else {
                        return {
                            ...ingredient
                        }
                    }
                })
            }
        })
        setTimeout(() => {
            this.setState(state => {
                return {
                    ingredients: state.ingredients.filter(i => i.id !== id)
                }
            })
        }, 1000)
    }

    removeInstruction(id) {
        this.setState(state => {
            return {
                instructions: state.instructions.map(instruction => {
                    if(instruction.id !== id) {
                        return instruction;
                    } else {
                        return {
                            ...instruction
                        }
                    }
                })
            }
        })
        setTimeout(() => {
            this.setState(state => {
                return {
                    instructions: state.instructions.filter(i => i.id !== id)
                }
            })
        }, 1000)
    }

    addInstruction = () => {
        const newInstruction = {
            value: this.state.instruction,
            id: this.guid()
        }
        this.setState((state) => ({
            instructions: [...state.instructions, newInstruction],
            instruction: ''
        }), () => {
            // Refer to onInputChange for thoughts on this section
        })
    }

    // Probably move this to an external file for reuse? We should find the best practice for naming dynamic element keys
    guid(){
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            ((c ^ crypto.getRandomValues(new Uint8Array(1))[0]) & (15 >> c / 4)).toString(16)
        )
    }

    render() {
        return (
            <Mutation mutation={CREATE_RECIPE} errorPolicy="none">
                {(CreateRecipe, {loading, error}) =>  {
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
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    // This isn't working till instructions accepts an array :(
                                    /*CreateRecipe({variables: {
                                        name: this.state.name,
                                        time: this.state.time,
                                        instructions: this.state.instructions
                                    }});*/
                                }}
                            >
                                <Input
                                    name="name"
                                    labelValue="Recipe Name"
                                    placeholder="Recipe Name"
                                    value={this.state.name}
                                    onChange={this.onInputChange}
                                />
                                <Input
                                    name="time"
                                    labelValue="Time"
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

                                <ul key={"ingredients-" + this.guid()}>
                                    {this.state.ingredients.map(ingredient => {
                                        return <li key={ingredient.id}>
                                                    {ingredient.quantity} {ingredient.name}
                                                    <Button className="remove" buttonClick={() => this.removeIngredient(ingredient.id)} value="x" type="button" />
                                                </li>
                                    })}
                                </ul>
                                <Input
                                    name="ingredient"
                                    value={this.state.ingredient}
                                    labelValue="Ingredient"
                                    className="ingredientinput"
                                    onChange={this.onInputChange}
                                />
                                <Input
                                    name="quantity"
                                    value={this.state.quantity}
                                    labelValue="Quantity"
                                    className="quantityinput"
                                    onChange={this.onInputChange}
                                />
                                <Button type="button" value="Add Ingredient" buttonClick={this.addIngredient} />

                                <ul key={"instructions-" + this.guid()}>
                                    {this.state.instructions.map(instruction => {
                                        return <li key={instruction.id}>
                                                    {instruction.value}
                                                    <Button className="remove" buttonClick={() => this.removeInstruction(instruction.id)} value="x" type="button" />
                                                </li>
                                    })}
                                </ul>

                                <Textbox
                                    name="instruction"
                                    value={this.state.instruction}
                                    labelValue="Instruction"
                                    className="instructionbox"
                                    row="4"
                                    onChange={this.onInputChange}
                                />
                                <Button type="button" value="Add Step" buttonClick={this.addInstruction} />

                                <Button type="submit" value="Add that delicious recipe!" />
                            </form>
                        </div>
                    )
                }}
            </Mutation>
        )
    }
}

export default CreateRecipe