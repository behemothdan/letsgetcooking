import React from 'react';
import './style/App.css';
import Header from './components/Header/Header';
import RecipeSearch from './components/RecipeSearch/RecipeSearch';
import CreateIngredient from './components/CreateIngredient/CreateIngredient';
import AddRecipe from './components/AddRecipe/AddRecipe';

const App = () => (
  <div className="App">
    <Header />
    <RecipeSearch />
    <CreateIngredient />
    <AddRecipe />
  </div>
)

export default App;