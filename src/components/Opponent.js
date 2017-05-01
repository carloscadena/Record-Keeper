import React, {Component} from 'react';

export default class Opponent extends React.Component {
  constructor(props) {
    super(props);
  }
  clicked(event){
    console.log(event)
  }
  render() {
    return (
      <div>
        <div>Opponent Id is {this.props.opponent} and Name is {this.props.name}</div>
        <ul>
          <li id="win" onClick={
            this.clicked
            // this.props.select("win")
           }>I won</li>
          <li id="loss" onClick={
            this.clicked
            // this.props.select('loss')
           }>I Lost</li>
        </ul>
        <button type="submit">Submit</button>
      </div>
    );
  }
}
