import React from 'react';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import AddIngredient from './components/AddIngredient/AddIngredient';
import AddRecipe from './components/CreateRecipe/CreateRecipe';

const App = () => (
  <div className="App">
    <Header />
    <Search />
    <AddIngredient />
    <AddRecipe />
  </div>
)

export default App;