import React, { Component } from 'react';
import xhr from 'xhr';
import Groups from './components/Groups';
import Players from './components/Players';
import './App.css';


class User extends Component {
  state = {
    group: '',
    groups: [],
    players: [],
    myId: 1
  };

  componentDidMount() {
    this.fetchGroups(this.state.myId);
  }

  fetchPlayers = (group) => {
    // evt.preventDefault();
    let self = this;
    xhr({
      url: `http://localhost:5400/players/${group}/${this.state.myId}`
    }, function (err, data) {
      self.setState({
        players: JSON.parse(data.body).map(ele => ele.user_name)
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
    return (
      <div>
        <Groups
          select={ this.fetchPlayers }
          items={ this.state.groups }
        />
        <h2>Welcome to Score Keep</h2>
        <div className="players-wrapper">
          <Players items={this.state.players} />
        </div>
      </div>
    );
  }
}

export default User;
