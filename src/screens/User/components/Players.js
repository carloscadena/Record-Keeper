import React, {Component} from 'react';

export default class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: ''
    }
  }
  clicked(id){
    this.setState({focused: id});
  }
  render() {
    let self = this;
    return (
      <div>{ this.props.players.map(
        function(ele){
          return <div id={ele.id} key={ele.id.toString()} onClick={self.clicked.bind(self, ele.id)}>
              <span className="name">{ele.user_name}</span>
              <span className="wins">Wins {ele.wins}</span>
              <span className="losses">Losses {ele.losses}</span>
          </div>;
        }) }
      </div>
    );
  }
}
