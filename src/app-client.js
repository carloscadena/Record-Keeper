'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import Login from './components/Login';
// import Apptest from './components/Apptest';


const AppClient = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login}/>
      <Route path="/user" component={App}/>
    </div>
  </Router>
);

window.onload = () => {
  ReactDOM.render(<AppClient />, document.getElementById('root'));
};
