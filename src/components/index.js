import React, { Component } from 'react';
import xhr from 'xhr';
import Groups from './components/Groups';
import Players from './components/Players';
import Opponent from './components/Opponent';
import './index.css';
import './App.css';


class User extends Component {
  state = {
    opponentId: 1,
    opponentName: 'test',
    groups: [],
    players: [],
    myId: 1
  };

  componentDidMount() {
    this.fetchGroups(this.state.myId);
  }

  pickOpponent = (opponent_data) => {
    this.setState({ opponentId: opponent_data.id, opponentName: opponent_data.name });
  }

  fetchPlayers = (group) => {
    // evt.preventDefault();
    let self = this;
    xhr({
      url: `http://localhost:5400/players/${group}/${this.state.myId}`
    }, function (err, data) {
      self.setState({
        players: JSON.parse(data.body)
      });
    });
  };

  fetchGroups = (id) => {
    let self = this;
    xhr({
      url: `http://localhost:5400/groups/${id}`
    }, function (err, data) {
      self.setState({
        groups: JSON.parse(data.body).map(ele => ele.group_name)
      });
    });
  };

  render() {
    console.log(this.state.players);
    return (
      <div>
        <Groups
          select={ this.fetchPlayers }
          groups={ this.state.groups }
        />
        <h2>Welcome to Score Keep</h2>
        <div className="players-wrapper">
          <Players players={this.state.players} select={this.pickOpponent} />
          <Opponent opponent={this.state.opponentId} name={this.state.opponentName} />
        </div>
      </div>
    );
  }
}

export default User;
