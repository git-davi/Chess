import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './login/Login';
import Game from './game/Game';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/game" component={ Game }/>
        <Route path="/" component={ Login }/>
      </Switch>
    </Router>
  );
}

export default App;
