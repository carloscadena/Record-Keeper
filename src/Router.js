import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from './screens/User/index'
import Home from './screens/Home/index'


const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={User}/>
    </div>
  </Router>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

export default BasicExample
