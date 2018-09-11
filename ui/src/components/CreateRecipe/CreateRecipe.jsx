import React, {Component} from "react";
import { graphql, compose } from "react-apollo";
import { CREATE_NEW_RECIPE, CREATE_RECIPE_INGREDIENTS, CREATE_MEALTYPE_RELATION, CREATE_DIFFICULTY_RELATION, GET_MEALTYPES, GET_DIFFICULTY, RECIPE_EXACT } from '../../graphql';
import { Guid, StringCleaner } from "../../utilities"
import PropTypes from "prop-types";
import Button from "../FormComponents/Button/Button";
import GetDifficulty from "../GetDifficulty/GetDifficulty";
import GetMealTypes from "../GetMealTypes/GetMealTypes";
import Input from "../FormComponents/Input/Input";
import Textbox from "../FormComponents/Textbox/Textbox";
import './CreateRecipe.css';
import { client }  from '../../client';

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
            instructionsFeedback: '',
            instructionFeedback: '', //This is validating the instruction before adding it to the state, not for form submission
            ingredientsFeedback: '',
            ingredientFeedback: '', //This is for validating adding the ingredient to the ingredients array, not for form submission
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
        this.formValidation = this.formValidation.bind(this);
    }

    componentDidMount() {
        client.query({
            query: GET_MEALTYPES,
        }).then(response => this.setState({mealtypes: response.data.mealtype}))

        client.query({
            query: GET_DIFFICULTY
        }).then(response => this.setState({difficulties: response.data.difficulty}))
    }

    formValidation = () => {
        let failedCheck = false;

        client.query({
            variables: {searchQuery: this.state.name},
            query: RECIPE_EXACT
        }).then(this.setState({nameFeedback: "Someone already named a delicious recipe " + this.state.name + ". Try another!"}), failedCheck = true)

        if(this.state.name === '') {
            this.setState({nameFeedback: "Give this pile of deliciousness a name!"})
            failedCheck = true;
        } else if(this.state.name.length <= 6) {
            this.setState({nameFeedback: "Please make the name longer than 6 characters."})
            failedCheck = true;
        }

        if(this.state.time === '') {
            this.setState({timeFeedback: "Tell us how long till we can eat!"})
            failedCheck = true;
        }

        // Both mealtype and difficulty should validate that the value is a legit choice before allowing submission in case of shenanigans
        if(this.state.mealtype === '') {
            this.setState({mealtypeFeedback: "Please choose what kind of food this happens to be!"})
            failedCheck = true;
        } else if(!this.state.mealtypes.includes(this.state.mealtype)) {
            this.setState({mealtypeFeedback: "Naughty! Don't try to mess with the form data!"})
            failedCheck = true;
        }

        if(this.state.difficulty === '') {
            this.setState({difficultyFeedback: "How skilled do we have to be to cook this food?"})
            failedCheck = true;
        } else if(!this.state.difficulties.includes(this.state.difficulty)) {
            this.setState({difficultyFeedback: "Naughty! Don'try to mess with the form data!"})
            failedCheck = true;
        }

        if(this.state.instructions.length < 1) {
            this.setState({instructionsFeedback: "We should probably provide some instructions."})
            failedCheck = true;
        }

        if(this.state.ingredients.length < 1) {
            this.setState({ingredientsFeedback: "We can't have anything to eat without ingredients!"})
            failedCheck = true;
        }
        if(failedCheck === false) {
            this.setState({formValid: true})
        }
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
        let ingredientValid = true;
        if(this.state.quantity === '' || this.state.quantity === null) {
            this.setState({quantityFeedback: 'Please tell us how much awesome flavor to use!'})
            ingredientValid = false;
        } else {
            this.setState({quantityFeedback: ''})
        }
        if(this.state.ingredient === '' || this.state.ingredient === null) {
            this.setState({ingredientFeedback: 'Please tell us what ingredient we are adding!'})
            ingredientValid = false;
        } else {
            this.setState({ingredientFeedback: ''})
        }
        if(ingredientValid === true){
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
        let instructionValid = true;
        if(this.state.instruction === '' || this.state.instruction === null) {
            this.setState({instructionFeedback: "Empty instructions don't help anybody!"})
            instructionValid = false;
        } else {
            this.setState({quantityFeedback: ''})
        }
        if(instructionValid) {
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
        }, 500)
    }

    handleCreateRecipe = () => {
        this.formValidation()
        if(this.state.formValid === true) {
            var tempInstructions = [];
            this.state.instructions.forEach(instruction => {
                tempInstructions.push(instruction.value)
            })

            this.props.CreateRecipe({variables: {
                name: StringCleaner(this.state.name, true),
                time: StringCleaner(this.state.time, true),
                instructions: tempInstructions
            }})
            .then(({data}) => {
                this.handleCreateIngredientRelation()
                this.handleCreateMealTypeRelation()
                this.handleCreateDifficultyRelation()
            }).catch((error) => {
                return (
                    <div>Oops! We had a hard time creating the recipe! {error}</div>
                )
            })
        } else {
            this.setState({formFeedback: "Please resolve any problems and try adding the recipe again!"});
        }
    }

    handleCreateIngredientRelation = () => {
        this.state.ingredients.forEach(ingredient => {
            this.props.CreateIngredientRelation({variables: {
                name: this.stringCleaner(ingredient.name, true),
                recipe: this.stringCleaner(this.state.name, true),
                quantity: ingredient.quantity.trim()
            }})
        })
    }

    handleCreateMealTypeRelation = () => {
        this.props.CreateMealTypeRelation({variables: {
            recipe: this.stringCleaner(this.state.name, true),
            type: this.state.mealtype.toLowerCase().trim()
        }})
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
    CreateDifficultyRelation: PropTypes.func
}

const CreateRecipeWithMutations = compose(
    graphql(GET_MEALTYPES),
    graphql(GET_DIFFICULTY),
    graphql(CREATE_NEW_RECIPE, {name: 'CreateRecipe'}),
    graphql(CREATE_RECIPE_INGREDIENTS, {name: 'CreateIngredientRelation'}),
    graphql(CREATE_MEALTYPE_RELATION, {name: 'CreateMealTypeRelation'}),
    graphql(CREATE_DIFFICULTY_RELATION, {name: 'CreateDifficultyRelation'}))(CreateRecipe)

export default CreateRecipeWithMutations