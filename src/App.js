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

  fetchGroups = () => {
    let self = this;
    xhr({
      url: `http://localhost:5400/groups/1`
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

export default App;
