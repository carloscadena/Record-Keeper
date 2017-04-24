import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  state = {
    group: ''
  };

  fetchGroup = (evt) => {
    evt.preventDefault();
    console.log('fetching group!', this.state.group);
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
