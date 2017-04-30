'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import { Route, BrowserRouter as Router } from 'react-router-dom';
// import { App } from './components/App';
// import { Login } from './components/Login';
import Apptest from './components/Apptest';


const AppClient = () => (


      <Apptest />

);

window.onload = () => {
  ReactDOM.render(<AppClient />, document.getElementById('root'));
};
