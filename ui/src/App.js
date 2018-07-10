import React from 'react';
import './style/App.css';
import Header from './components/Header/Header';
import RecipeSearch from './components/RecipeSearch/RecipeSearch';
import AddIngredient from './components/AddIngredient/AddIngredient';
import AddRecipe from './components/AddRecipe/AddRecipe';

const App = () => (
  <div className="App">
    <Header />
    <RecipeSearch />
    <AddIngredient />
    <AddRecipe />
  </div>
)

export default App;