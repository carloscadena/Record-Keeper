import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import xhr from 'xhr';


class App extends Component {
  state = {
    group: '',
    players: []
  };

  fetchGroup = (evt) => {
    evt.preventDefault();

    let self = this;
    let group = this.state.group;
    xhr({
      url: 'http://localhost:5400/groups'
    }, function (err, data) {
      /* Called when the request is finished */
      // console.log('fetching group!', data.body);
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
        <h2>Welcome to Score Keep</h2>
        <form onSubmit={this.fetchGroup}>
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
