import React from 'react';

const DisplaySearchResults = ({searchResults}) => {
    return (
        <div className="RecipeList">
            <h1>Recipes:</h1>
            {searchResults.map(recipe => (
                <div key={recipe.name}>
                    <h3>{recipe.name}</h3>
                    <ul>
                        {recipe.instructions.map(y => {
                        return <li key={y}>{y}</li>
                        })}
                        <ul key={recipe.ingredients}>
                            {recipe.ingredients.map(i => {
                                return <li key={recipe.name + i.name}>{i.quantity} {i.name}</li>
                            })}
                        </ul>
                        <li>Time: {recipe.time}</li>
                        <li>Dish Type: {recipe.mealtype.type}</li>
                        <li>Difficulty: {recipe.difficulty.value}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default DisplaySearchResults