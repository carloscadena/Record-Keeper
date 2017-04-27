import React, {Component} from 'react';

export default class Players extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>{ this.props.players.map(
        function(ele, index){
          return <div id={ele.id} key={index.toString()}>
            <span className="name">{ele.user_name}</span>
            <span className="wins">Wins {ele.wins}</span>
            <span className="losses">Losses {ele.losses}</span>
          </div>;
        }) }
      </div>
    );
  }
}
