import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import xhr from 'xhr';
import Groups from './screens/User/components/Groups';


class App extends Component {
  state = {
    group: '',
    groups: [],
    players: []
  };

  fetchPlayers = (evt) => {
    evt.preventDefault();

    let self = this;
    let group = this.state.group;
    xhr({
      url: 'http://localhost:5400/groups'
    }, function (err, data) {
      self.setState({
        players: JSON.parse(data.body)
      });
    });
  };

  fetchGroups = (evt) => {
    evt.preventDefault();

    let self = this;
    let group = this.state.group;
    xhr({
      url: 'http://localhost:5400/groups'
    }, function (err, data) {
      self.setState({
        players: JSON.parse(data.body)
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
        <Groups items={ ["goog", "CF"] }/>
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
        <p className="group-wrapper">
         <span className="group">{ console.log(currentGroup) }</span>
       </p>
      </div>
    );
  }
}

export default App;
