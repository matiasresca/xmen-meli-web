import React from 'react';

import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Dna from "./Dna/Dna";

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <div className="app">
            <Switch>
              <Route path="/xmen">
                <Dna />
              </Route>
              <Redirect path="/" to="/xmen" />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;