import React, { Component } from 'react';
import xhr from 'xhr';
import Groups from './Groups';
import Players from './Players';
import Opponent from './Opponent';
// import '../build/css/index.css';
// import '../build/css/App.css';
// const BASE_URL = 'https://api.github.com'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      opponentId: 1,
      opponentName: 'test',
      groups: [],
      players: [],
      myId: 1,
      winLoss: '',
    }
  };

  componentDidMount() {
    this.fetchGroups(this.state.myId);
  }

  pickOpponent(opponent_data){
    this.setState({ opponentId: opponent_data.id, opponentName: opponent_data.name });
  }

  fetchPlayers(group, myId) {
    // evt.preventDefault();
    // console.log('fetching players...')
    let self = this;
    // console.log('this at fetch player call', this)
    xhr({
      url: `http://localhost:5400/players/${group}/${myId}`
    }, function (err, data) {
      // console.log('data', data);
      // console.log('this at fetchplayers callback', this.state);
      // console.log('self', self.state)
      self.setState({
        players: JSON.parse(data.body)
      });
    });
  };

  fetchGroups(id){
    // console.log('fetching groups...')
    let self = this;
    xhr({
      url: `http://localhost:5400/groups/${id}`
    }, function (err, data) {
      // console.log('this at fetchgroup callback', this)
      self.setState({
        groups: JSON.parse(data.body).map(ele => ele.group_name)
      });
    });
  };

  winLoss(status){
    this.setState({ winLoss: status });
    console.log('winLoss state updated', status)
  }

  render() {
    // console.log(this.state.players);
    return (
      <div>
        <Groups
          select={ this.fetchPlayers.bind(this) }
          groups={ this.state.groups }
        />
        <h2>Welcome to Score Keep</h2>
        <div className="players-wrapper">
          <Players players={this.state.players} select={this.pickOpponent.bind(this)} />
          <Opponent opponent={this.state.opponentId} selected={this.state.winLoss} name={this.state.opponentName} select={this.winLoss.bind(this) }/>
        </div>
      </div>
    );
  }
}
