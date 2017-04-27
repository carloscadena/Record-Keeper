import React, {Component} from 'react';

export default class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: ''
    }
  }
  updateOpponent (user_data) {
    this.props.select(user_data);
  }
  render() {
    let self = this;
    return (
      <div>{ this.props.players.map(
        function(ele){
          return <div id={ele.id} key={ele.id.toString()} onClick={self.updateOpponent.bind(self, {name: ele.user_name, id: ele.id})}>
              <span className="name">{ele.user_name}</span>
              <span className="wins">Wins {ele.wins}</span>
              <span className="losses">Losses {ele.losses}</span>
          </div>;
        }) }
      </div>
    );
  }
}
