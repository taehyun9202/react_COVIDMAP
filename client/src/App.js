import React, { Component, useState} from 'react';
import { Router, Link } from '@reach/router';
import './App.css'; /* optional for styling like the :hover pseudo-class */
import Main from './components/Main';
import Stateinfo from './components/Stateinfo'

const App = props => {
  const [abbreviation, setAbbreviation] = useState("")
 
  return (
    <div className="App">
    <Router>
      <Main path="/"/>
      <Stateinfo path="/stateinfo/:abbreviation" param={{value: abbreviation}} />
    </Router>
    </div>
  );
}

export default App;