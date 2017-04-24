import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import xhr from 'xhr';


class App extends Component {
  state = {
    group: ''
  };

  fetchGroup = (evt) => {
    evt.preventDefault();

    let group = this.state.group;
    xhr({
      url: 'localhost:5400/users'
      }, function (err, data) {
        /* Called when the request is finished */
        console.log('fetching group!', data.body);
      });
  };

  changeGroup = (evt) => {
    this.setState({
      group: evt.target.value
    });
  };

  render() {
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
      </div>
    );
  }
}

export default App;
