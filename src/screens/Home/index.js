import React, {Component} from 'react';
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
    );
  }
}
