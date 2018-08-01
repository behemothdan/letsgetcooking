import React, {Component} from "react";
import { graphql,compose } from "react-apollo";
import { CREATE_NEW_RECIPE, CREATE_RECIPE_INGREDIENTS, CREATE_MEALTYPE_RELATION, CREATE_DIFFICULTY_RELATION } from '../../graphql';
import PropTypes from "prop-types";

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
            difficulty: '',
            formValid: false,
            nameFeedback: '',
            timeFeedback: '',
            mealtypeFeedback: '',
            difficultyFeedback: '',
            instructionsFeedback: '',
            ingredientsFeedback: ''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.addInstruction = this.addInstruction.bind(this);
        this.removeInstruction = this.removeInstruction.bind(this);
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this);
        this.handleCreateIngredientRelation = this.handleCreateIngredientRelation.bind(this);
        this.handleCreateMealTypeRelation = this.handleCreateMealTypeRelation.bind(this);
        this.handleCreateDifficultyRelation = this.handleCreateDifficultyRelation.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.stringCleaner = this.stringCleaner.bind(this);
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
            name: this.stringCleaner(this.state.ingredient, true),
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

    // Adds the instruction to the state that will be used later for addition to the database
    addInstruction = () => {
        const newInstruction = {
            value: this.stringCleaner(this.state.instruction, false),
            id: this.guid()
        }
        this.setState((state) => ({
            instructions: [...state.instructions, newInstruction],
            instruction: ''
        }), () => {
            // Refer to onInputChange for thoughts on this section
        })
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

    // Probably move this to an external file for reuse? We should find the best practice for naming dynamic element keys
    guid(){
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            ((c ^ crypto.getRandomValues(new Uint8Array(1))[0]) & (15 >> c / 4)).toString(16)
        )
    }

    formValidation = () => {
        if(this.state.name === '') {
            this.setState({nameFeedback: "Give it a name!"})
        } else if(this.state.name.length <= 6) {
            this.setState({nameFeedback: "Please make the name longer than 6 characters."})
        }
        if(this.state.time === '') {
            this.setState({timeFeedback: "Tell us how long till we can eat!"})
        }
    }

    handleCreateRecipe = () => {
        this.formValidation()
        if(this.state.formValid === true) {
            var tempInstructions = [];
            this.state.instructions.forEach(instruction => {
                tempInstructions.push(instruction.value)
            })

            this.props.CreateRecipe({variables: {
                name: this.stringCleaner(this.state.name, true),
                time: this.stringCleaner(this.state.time, true),
                instructions: tempInstructions
            }})
            .then(({data}) => {
                // Do something with data? Or don't pass it in I guess. Probably use it to change some styling to indicate success?
                this.handleCreateIngredientRelation()
                this.handleCreateDifficultyRelation()
                this.handleCreateMealTypeRelation()
            }).catch((error) => {
                return (
                    <div>Oops! We had a hard time creating the recipe! {error}</div>
                )
            })
        }
    }

    handleCreateIngredientRelation = () => {
        this.state.ingredients.forEach(ingredient => {
            this.props.CreateIngredientRelation({variables: {
                name: this.stringCleaner(ingredient.name, true),
                recipe: this.stringCleaner(this.state.name, true),
                quantity: ingredient.quantity.trim()
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

    handleCreateMealTypeRelation = () => {
        this.props.CreateMealTypeRelation({variables: {
            recipe: this.stringCleaner(this.state.name, true),
            type: this.state.mealtype.toLowerCase().trim()
        }})
        .then(({data}) => {
            return (
                <div>Meal type added! {data}</div>
            )
        })
        .catch(({data}) => {
            return (
                <div>Oops! We had a hard time setting the meal type! {data}</div>
            )
        })
    }

    handleCreateDifficultyRelation = () => {
        this.props.CreateDifficultyRelation({variables: {
            recipe: this.stringCleaner(this.string.name, true),
            value: this.state.difficulty.toLowerCase()
        }})
        .then(({data}) => {
            return(
                <div>Difficulty added! {data}</div>
            )
        })
        .catch(({data}) => {
            return(
                <div>Oops! We had a hard time setting the difficulty! {data}</div>
            )
        })
    }

    stringCleaner = (string, applyLowerCase) => {
        let cleanString = string;
        if(applyLowerCase) {
            cleanString = cleanString.toLowerCase();
        }
        cleanString = cleanString.trim();
        cleanString = cleanString.replace(/[|&;$%@"<>()+,]/g, "");
        cleanString = cleanString.replace(/<[^>]*>/g, '');
        return cleanString;
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
                    <div id="nameFeedback" className="nameFeedback">{this.state.nameFeedback}</div>
                    <Input
                        name="time"
                        labelValue="Time"
                        placeholder="How long till eating?"
                        value={this.state.time}
                        onChange={this.onInputChange}
                    />
                    <div id="timeFeedback" className="timeFeedback">{this.state.timeFeedback}</div>
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

CreateRecipe.propTypes = {
    CreateRecipe: PropTypes.func,
    CreateIngredientRelation: PropTypes.func,
    CreateMealTypeRelation: PropTypes.func,
    CreateDifficultyRelation: PropTypes.func
}

const CreateRecipeWithMutations = compose(
    graphql(CREATE_NEW_RECIPE, {name: 'CreateRecipe'}),
    graphql(CREATE_RECIPE_INGREDIENTS, {name: 'CreateIngredientRelation'}),
    graphql(CREATE_MEALTYPE_RELATION, {name: 'CreateMealTypeRelation'}),
    graphql(CREATE_DIFFICULTY_RELATION, {name: 'CreateDifficultyRelation'}))(CreateRecipe)

export default CreateRecipeWithMutations