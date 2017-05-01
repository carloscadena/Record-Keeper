import React, {Component} from 'react';

export default class Opponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div>Opponent Id is {this.props.opponent} and Name is {this.props.name}</div>
        <ul>
          <li >I won</li>
          <li >I Lost</li>
        </ul>
        <button type="submit">Submit</button>
      </div>
    );
  }
}
