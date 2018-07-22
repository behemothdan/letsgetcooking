import React from 'react';
import { connect } from 'react-redux';

import AddIngredient from './components/AddIngredient/AddIngredient';
import AddRecipe from './components/CreateRecipe/CreateRecipe';
import Header from './components/Header/Header';
import Search from './components/Search/Search';

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

export default connect()(App);