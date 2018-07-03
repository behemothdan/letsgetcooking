import React from 'react';
import './style/App.css';
import RecipeSearch from './components/RecipeSearch';

const Header = () => (
  <header className="App-header">
    <img src={process.env.PUBLIC_URL + '/img/grandstack.png'} className="App-logo" alt="logo" />
    <h1 className="App-title">Let's get cooking...</h1>
  </header>
)

const App = () => (
  <div className="App">
    <Header />
    <RecipeSearch />
  </div>
)

export default App;