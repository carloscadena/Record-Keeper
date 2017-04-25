'use strict';

import React, {Component} from 'react';

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: 0 };
  }
  clicked(index){
    this.setState({focused: index});
    this.props.select();
  }
  render() {
    let self = this;
    return (
      <div>
        <ul>{ this.props.items.map(function(m, index){
          let style = '';
          if(self.state.focused == index){
              style = 'focused';
          }
          // Notice the use of the bind() method. It makes the
          // index available to the clicked function:
          return <li
            key={index.toString()}
            className={style}
            onClick={self.clicked.bind(self, index)}>{m}
            </li>;
          }) }
        </ul>
        <p>Selected: {this.props.items[this.state.focused]}</p>
      </div>
    );
  }
}
