import React, {Component} from "react";
import { graphql,compose } from "react-apollo";
import { CREATE_NEW_RECIPE, CREATE_RECIPE_INGREDIENTS, CREATE_MEALTYPE_RELATION, CREATE_DIFFICULTY_RELATION } from '../../graphql';

import Button from "../FormComponents/Button/Button";
import GetDifficulty from "../GetDifficulty/GetDifficulty";
import GetMealTypes from "../GetMealTypes/GetMealTypes";
import Input from "../FormComponents/Input/Input";
import Textbox from "../FormComponents/Textbox/Textbox";

class CreateRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredient: '',     // This is only used to temporarily hold the ingredient until it is added to the array below
            quantity: '',       // The same is true for this as it is for the item above
            instruction: '',    // Same as above
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
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this);
        this.handleCreateIngredientRelation = this.handleCreateIngredientRelation.bind(this);
    }

    onInputChange(event){
        // As long as the name of the input component matches the name of the state property this will add them to the appropriate keys.
        const stateName = event.target.name;
        const value = event.target.value;
        this.setState(({[stateName]: value}), () => {
            // In other components this calls back to the parent
            // We can probably use this for something else like some kind of validation
            // since it is called after the setState is finished or simplify it:
            // this.setState(s => ({[stateName]: value}))
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
    // This only removes the ingredient that was added to the list and added to the state.
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

    // Similar to above, this only removes the instruction from the state before submission.
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

    // Adds the instruction to the state that will be used later for addition to the database
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

    handleCreateRecipe = () => {
        var tempInstructions = [];
        this.state.instructions.forEach(instruction => {
            tempInstructions.push(instruction.value)
        })

        this.props.CreateRecipe({variables: {
            name: this.state.name.toLowerCase(),
            time: this.state.time,
            instructions: tempInstructions
        }})
        .then(({data}) => {
            // Do something with data? Or don't pass it in I guess. Probably use it to change some styling to indicate success?
            console.log(data);
            this.handleCreateIngredientRelation()
        }).catch((error) => {
            console.log("Error adding recipe", error);
        })
    }

    handleCreateIngredientRelation = () => {
        this.state.ingredients.forEach(ingredient => {
            this.props.CreateIngredientRelation({variables: {
                name: ingredient.name.toLowerCase(),
                recipe: this.state.name.toLowerCase(),
                quantity: ingredient.quantity
            }})
            .then(({data}) => {
                // Do some kind of feedback on successful relationship creation?
                //console.log("Added ingredient: " + data)
            })
            .catch(({error}) => {
                // Create some more informative error messages
                console.log("Error adding ingredient: " + error)
            })
        })
    }

    render() {
        return (
            <div>
                <h2>Add a new recipe!</h2>
                <form onSubmit={e => { e.preventDefault(); this.handleCreateRecipe() }}>
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
                    <Button type="submit" value="Add that delicious recipe!" />
                </form>
            </div>
        )
    }
}

const CreateRecipeWithMutations = compose(graphql(CREATE_NEW_RECIPE, {name: 'CreateRecipe'}),
    graphql(CREATE_RECIPE_INGREDIENTS, {name: 'CreateIngredientRelation'}))(CreateRecipe)

export default CreateRecipeWithMutations