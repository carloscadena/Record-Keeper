import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import xhr from 'xhr';
import Groups from './screens/User/components/Groups';
import Players from './screens/User/components/Players';

class App extends Component {
  state = {
    group: 'CF',
    groups: [],
    players: []
  };

  componentDidMount() {
    this.fetchGroups();
  }

  fetchPlayers = (evt) => {
    // evt.preventDefault();
    let self = this;
    xhr({
      url: 'http://localhost:5400/players'
    }, function (err, data) {
      self.setState({
        players: JSON.parse(data.body).map(ele => ele.user_name)
      });
    });
  };

  fetchGroups = () => {
    let self = this;
    xhr({
      url: 'http://localhost:5400/groups'
    }, function (err, data) {
      self.setState({
        groups: JSON.parse(data.body).map(ele => ele.group_name)
      });
    });
  };

  changeGroup = (evt) => {
    this.setState({
      group: evt.target.value
    });
  };

  render() {
    let currentGroup = 'not loaded yet';
    currentGroup = this.state.players;
    return (
      <div>
        <Groups
          select={ this.fetchPlayers }
          items={ this.state.groups }
        />
        <h2>Welcome to Score Keep</h2>
        <form onSubmit={this.fetchPlayers}>
          <label>test form
            <input
              placeholder={"test"}
              type="text"
              value={this.state.group}
              onChange={this.changeGroup}
            />
          </label>
        </form>
        <div className="players-wrapper">
          <Players items={this.state.players} />
        </div>
      </div>
    );
  }
}

export default App;
