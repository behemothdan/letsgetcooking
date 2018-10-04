import React, { Component } from "react";
import { client } from '../../client';
import { graphql, compose } from "react-apollo";
import { CREATE_NEW_RECIPE, CREATE_RECIPE_INGREDIENTS, CREATE_MEALTYPE_RELATION, CREATE_DIFFICULTY_RELATION, GET_MEALTYPES, GET_DIFFICULTY, RECIPE_EXACT, CREATE_USERRECIPE_RELATION } from '../../graphql';
import { Guid, StringCleaner } from "../../utilities"
import PropTypes from "prop-types";
import Button from "../FormComponents/Button/Button";
import GetDifficulty from "../GetDifficulty/GetDifficulty";
import GetMealTypes from "../GetMealTypes/GetMealTypes";
import Input from "../FormComponents/Input/Input";
import Textbox from "../FormComponents/Textbox/Textbox";
import './CreateRecipe.css';

class CreateRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: '',     // This is only used to temporarily hold the ingredient until it is added to the array below
            quantity: '',       // The same is true for this as it is for the item above
            instruction: '',    // Same as above
            name: '',
            time: '',
            mealtypes: [],
            difficulties: [],
            instructions: [],
            ingredients: [],
            mealtype: '',
            difficulty: '',
            formValid: false,
            formFeedback: '', // In the future we can probably build one array of feedback data for ease of reading.
            nameFeedback: '',
            timeFeedback: '',
            mealtypeFeedback: '',
            difficultyFeedback: '',
            instructionsFeedback: '', // This is feedback for the array of instructions
            instructionFeedback: '', //This is validating s single instruction being added through the form before adding it to the state, not for form submission
            ingredientsFeedback: '', // This is feedback for the array of ingredients
            ingredientFeedback: '', //This is for validating adding a single ingredient through the form to the ingredients array, not for form submission
            quantityFeedback: ''    //Same as above
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
        this.handleCreateUserRecipeRelation = this.handleCreateUserRecipeRelation.bind(this);
        this.formValidation = this.formValidation.bind(this);
    }

    formValidation = () => {
        let failedCheck = false;

        // Both mealtype and difficulty should validate that the value is a legit choice before allowing submission in case of shenanigans
        const getMealtypes = async () => {
            const mealtypes = await client.query({
                query: GET_MEALTYPES
            })
            this.setState({ mealtypes: mealtypes.data.mealtype })

            if (this.state.mealtype === '') {
                failedCheck = true;
                return this.setState({ mealtypeFeedback: "Please choose what kind of food this happens to be!" })
            } else if (this.state.mealtypes.filter(e => e.type === this.state.mealtype).length === 0) {
                failedCheck = true;
                return this.setState({ mealtypeFeedback: "Naughty! Don't try to mess with the form data!" })
            } else {
                return this.setState({ mealtypeFeedback: '' })
            }
        }

        const getDifficulties = async () => {
            const difficulties = await client.query({
                query: GET_DIFFICULTY
            })
            this.setState({ difficulties: difficulties.data.difficulty })

            if (this.state.difficulty === '') {
                failedCheck = true;
                return this.setState({ difficultyFeedback: "How skilled do we have to be to cook this food?" })
            } else if (this.state.difficulties.filter(e => e.value === this.state.difficulty).length === 0) {
                failedCheck = true;
                return this.setState({ difficultyFeedback: "Naughty! Don'try to mess with the form data!" })
            } else {
                return this.setState({ difficultyFeedback: '' })
            }
        }

        const checkRecipeName = async () => {
            const checkResults = await client.query({
                variables: { searchQuery: this.state.name },
                query: RECIPE_EXACT
            })

            if (checkResults.data.RecipesByExactName.length) {
                failedCheck = true;
                return this.setState({ nameFeedback: "Someone already named a delicious recipe " + this.state.name + ". Try another!" })
            } else {
                if (this.state.name === '') {
                    failedCheck = true;
                    return this.setState({ nameFeedback: "Give this pile of deliciousness a name!" })
                } else if (this.state.name.length <= 6) {
                    failedCheck = true;
                    return this.setState({ nameFeedback: "Please make the name longer than 6 characters." })
                } else {
                    return this.setState({ nameFeedback: '' })
                }
            }
        }

        getMealtypes()
        getDifficulties()
        checkRecipeName()

        if (this.state.time === '') {
            this.setState({ timeFeedback: "Tell us how long till we can eat!" })
            failedCheck = true;
        } else {
            this.setState({ timeFeedback: "" })
        }

        if (this.state.instructions.length < 1) {
            this.setState({ instructionsFeedback: "We should probably provide some instructions." })
            failedCheck = true;
        } else {
            this.setState({ instructionsFeedback: '' })
        }

        if (this.state.ingredients.length < 1) {
            this.setState({ ingredientsFeedback: "We can't have anything to eat without ingredients!" })
            failedCheck = true;
        } else {
            this.setState({ ingredientsFeedback: '' })
        }

        if (failedCheck === false) {
            //this.setState({ formValid: true })
            return true;
        } else {
            return false;
        }
    }

    onInputChange(event) {
        // As long as the name of the input component matches the name of the state property this will add them to the appropriate keys.
        const stateName = event.target.name;
        const value = event.target.value;

        this.setState(({ [stateName]: value }), () => {
            // In other components this calls back to the parent
            // We can probably use this for something else like some kind of validation
            // since it is called after the setState is finished or simplify it:
            // this.setState(s => ({[stateName]: value}))
        });
    }

    addIngredient = () => {
        let ingredientValid = true;
        if (this.state.quantity === '' || this.state.quantity === null) {
            this.setState({ quantityFeedback: 'Please tell us how much awesome flavor to use!' })
            ingredientValid = false;
        } else {
            this.setState({ quantityFeedback: '' })
        }
        if (this.state.ingredient === '' || this.state.ingredient === null) {
            this.setState({ ingredientFeedback: 'Please tell us what ingredient we are adding!' })
            ingredientValid = false;
        } else {
            this.setState({ ingredientFeedback: '' })
        }
        if (ingredientValid === true) {
            const newIngredient = {
                name: StringCleaner(this.state.ingredient, true),
                quantity: this.state.quantity,
                id: Guid()
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
    }

    removeIngredient(id) {
        this.setState(state => {
            return {
                ingredients: state.ingredients.map(ingredient => {
                    if (ingredient.id !== id) {
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
        }, 500)
    }

    // Adds the instruction to the state that will be used later for addition to the database
    addInstruction = () => {
        let instructionValid = true;
        if (this.state.instruction === '' || this.state.instruction === null) {
            this.setState({ instructionFeedback: "Empty instructions don't help anybody!" })
            instructionValid = false;
        } else {
            this.setState({ quantityFeedback: '' })
        }
        if (instructionValid) {
            const newInstruction = {
                value: StringCleaner(this.state.instruction, false),
                id: Guid()
            }
            this.setState((state) => ({
                instructions: [...state.instructions, newInstruction],
                instruction: ''
            }), () => {
                // Refer to onInputChange for thoughts on this section
            })
        }
    }

    // Similar to above, this only removes the instruction from the state before submission.
    removeInstruction(id) {
        this.setState(state => {
            return {
                instructions: state.instructions.map(instruction => {
                    if (instruction.id !== id) {
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
        }, 500)
    }

    handleCreateRecipe = () => {
        const formIsValid = async () => {
            const formValidation = await this.formValidation()
            creatingRecipe(formValidation);
        }

        const creatingRecipe = async (validationResult) => {
            if (validationResult) {
                this.setState({ formFeedback: '' })
                var tempInstructions = [];
                this.state.instructions.forEach(instruction => {
                    tempInstructions.push(instruction.value)
                })

                const recipe = await this.props.CreateRecipe({
                    variables: {
                        name: StringCleaner(this.state.name, true),
                        time: StringCleaner(this.state.time, true),
                        instructions: tempInstructions
                    }
                })

                //await this.handleCreateIngredientRelation(recipe)
                //await this.handleCreateMealTypeRelation(recipe)
                await this.handleCreateDifficultyRelation(recipe)
                //await this.handleCreateUserRecipeRelation(recipe)
            } else {
                this.setState({ formFeedback: "Please resolve any problems and try adding the recipe again!" });
            }
        }
        formIsValid()
    }

    handleCreateIngredientRelation = async (recipe) => {
        await this.state.ingredients.forEach(ingredient => {
            this.props.CreateIngredientRelation({
                variables: {
                    name: ingredient.name,
                    recipe: recipe.data.CreateRecipe.name,
                    quantity: ingredient.quantity.trim()
                }
            })
        })
    }

    handleCreateDifficultyRelation = async (recipe) => {
        await this.props.CreateDifficultyRelation({
            variables: {
                recipe: recipe.data.CreateRecipe.name,
                value: this.state.difficulty.toLowerCase()
            }
        })
    }

    handleCreateMealTypeRelation = async (recipe) => {
        await this.props.CreateMealTypeRelation({
            variables: {
                recipe: recipe.data.CreateRecipe.name,
                type: this.state.mealtype.toLowerCase().trim()
            }
        })
    }

    handleCreateUserRecipeRelation = async (recipe) => {
        await this.props.CreateUserRecipeRelation({
            variables: {
                id: localStorage.getItem('id_token'),
                recipeName: recipe.data.CreateRecipe.name,
                date: "Test"
            }
        })
    }

    render() {
        return (
            <div className="createRecipe">
                <h2>Add a new recipe!</h2>
                <span id="formFeedback" className="formFeedback">{this.state.formFeedback}</span>
                <form onSubmit={e => { e.preventDefault(); this.handleCreateRecipe() }}>
                    <Input
                        name="name"
                        labelValue="Recipe Name"
                        placeholder="Recipe Name"
                        value={this.state.name}
                        onChange={this.onInputChange}
                        feedback={this.state.nameFeedback}
                    />
                    <Input
                        name="time"
                        labelValue="Time"
                        placeholder="How long till eating?"
                        value={this.state.time}
                        onChange={this.onInputChange}
                        feedback={this.state.timeFeedback}
                    />
                    <ul key={"instructions-" + Guid()}>
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
                        feedback={this.state.instructionFeedback}
                    />
                    <span id="instructionsFeedback" className="instructionsFeedback">{this.state.instructionsFeedback}</span>
                    <Button type="button" value="Add Step" buttonClick={this.addInstruction} />

                    <GetMealTypes
                        value={this.state.mealtype}
                        onChange={this.onInputChange}
                        feedback={this.state.mealtypeFeedback}
                    />
                    <GetDifficulty
                        value={this.state.difficulty}
                        onChange={this.onInputChange}
                        feedback={this.state.difficultyFeedback}
                    />

                    <ul key={"ingredients-" + Guid()}>
                        {this.state.ingredients.map(ingredient => {
                            return <li key={ingredient.id}>
                                {ingredient.quantity} {ingredient.name}
                                <Button className="remove" buttonClick={() => this.removeIngredient(ingredient.id)} value="x" type="button" />
                            </li>
                        })}
                    </ul>
                    <span id="ingredientsFeedback" className="ingredientsFeedback">{this.state.ingredientsFeedback}</span>

                    <Input
                        name="ingredient"
                        value={this.state.ingredient}
                        labelValue="Ingredient"
                        className="ingredientinput"
                        onChange={this.onInputChange}
                        feedback={this.state.ingredientFeedback}
                    />
                    <Input
                        name="quantity"
                        value={this.state.quantity}
                        labelValue="Quantity"
                        className="quantityinput"
                        onChange={this.onInputChange}
                        feedback={this.state.quantityFeedback}
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
    CreateDifficultyRelation: PropTypes.func,
    CreateUserRecipeRelation: PropTypes.func
}

const CreateRecipeWithMutations = compose(
    graphql(GET_MEALTYPES),
    graphql(GET_DIFFICULTY),
    graphql(CREATE_NEW_RECIPE, { name: 'CreateRecipe' }),
    graphql(CREATE_RECIPE_INGREDIENTS, { name: 'CreateIngredientRelation' }),
    graphql(CREATE_MEALTYPE_RELATION, { name: 'CreateMealTypeRelation' }),
    graphql(CREATE_USERRECIPE_RELATION, { name: 'CreateUserRecipeRelation' }),
    graphql(CREATE_DIFFICULTY_RELATION, { name: 'CreateDifficultyRelation' }))(CreateRecipe)

export default CreateRecipeWithMutations