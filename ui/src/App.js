import React, { Component } from 'react';
import './style/App.css';
//import RecipeList from './components/RecipeList';
//import Search from './components/Search';
import RecipeList2 from './components/RecipeList2';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={process.env.PUBLIC_URL + '/img/grandstack.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to GRANDstack</h1>
        </header>
                
        <RecipeList2 searchQuery="ed" />       
      </div>
    );
  }
}

export default App;