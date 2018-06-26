import React, { Component } from 'react';
import './style/App.css';
import RecipeSearch from './components/RecipeSearch';

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={process.env.PUBLIC_URL + '/img/grandstack.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to GRANDstack</h1>
        </header>
                   
        <RecipeSearch />
      </div>
    );
  }
}

export default App;