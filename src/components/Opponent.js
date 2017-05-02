import React, {Component} from 'react';

export default class Opponent extends React.Component {
  constructor(props) {
    super(props);
  }
  clicked(event){
    console.log('winLoss target id is', event.target.id);
    console.log('this is', this);
    this.props.select(event.target.id);
  }
  selected(selected, choice){
    if (selected == choice){return 'focused'}
    // if (this.props.selected == style
  }
  render() {
    let self = this;
    return (
      <div>
        <div>Opponent Id is {this.props.opponent} and Name is {this.props.name}</div>
        <ul>
          <li id="win" className={ this.selected(this.props.selected, 'win') }  onClick={
            self.clicked.bind(self)
            // this.props.select("win")
           }>I won</li>
          <li id="loss" className={ this.selected(this.props.selected, 'loss') } onClick={
            self.clicked.bind(self)
            // this.props.select('loss')
           }>I Lost</li>
        </ul>
        <button type="submit">Submit</button>
      </div>
    );
  }
}
