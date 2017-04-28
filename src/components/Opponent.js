import React, {Component} from 'react';

export default class Opponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    }
  }
  clicked(winLoss){
    setState({selected: winLoss})
  }
  render() {
    return (
      <div>
        <div>Opponent Id is {this.props.opponent} and Name is {this.props.name}</div>
        <ul>
          <li onClick={this.clicked.bind(this, "win")}>I won</li>
          <li onClick={this.clicked.bind(this, "loss")}>I Lost</li>
        </ul>
        <button type="submit">Submit</button>
      </div>
    );
  }
}
