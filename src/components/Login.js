import React, {Component} from 'react';
import { Link } from 'react-router-dom'

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/user">Login</Link></li>
        </ul>
      </div>
    );
  }
}
