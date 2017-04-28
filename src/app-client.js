'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { App } from './components/App';
import { Login } from './components/Login';

const AppClient = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login}/>
      <Route path="/user" component={App}/>
    </div>
  </Router>
)

window.onload = () => {
  render(<AppClient />, document.getElementById('root'));
};
