import React, {Component} from 'react';

export default class Players extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ul>{ this.props.items.map(
          function(ele, index){
            return <li key={index.toString()}>{ele.user_name}</li>;
          }) }
        </ul>
      </div>
    );
  }
}
