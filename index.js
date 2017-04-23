'use stric';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import 'babel-polyfill';
import $ from 'jquery';
import Home from '/app/screens/Home';
import User from '/app/screens/User';
// import formSetUp from 'app';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/:username" component={User} />
  </Router>,
  document.getElementById('root')
);

// formSetUp()
