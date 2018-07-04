import React from 'react';
import './style/App.css';
import Header from './components/Header/Header';
import RecipeSearch from './components/RecipeSearch/RecipeSearch';
import CreateIngredient from './components/CreateIngredient/CreateIngredient';

const App = () => (
  <div className="App">
    <Header />
    <RecipeSearch />
    <CreateIngredient />
  </div>
)

export default App;