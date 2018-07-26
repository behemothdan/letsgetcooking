import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from "./views/Home";
import './style/App.css';

const App = () => (
  <Router>
    <div>
      <Route path="/" component={Home} />
    </div>
  </Router>
)

export default connect()(App);