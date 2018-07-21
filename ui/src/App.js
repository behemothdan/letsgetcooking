import React from 'react';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import AddIngredient from './components/AddIngredient/AddIngredient';
import AddRecipe from './components/CreateRecipe/CreateRecipe';
import './style/App.css';

const App = () => (
  <div>
    <Header />
    <div className="container">
      <div className="content-area">
        <Search />
        <AddIngredient />
        <AddRecipe />
      </div>
    </div>
  </div>
)

export default App;