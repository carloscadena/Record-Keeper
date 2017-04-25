import React, {Component} from 'react';

export default class Players extends React.Component {
  constructor(props) {
    super(props);
  }

  changeGroup = (evt) => {
    this.setState({
      group: evt.target.value
    });
  };
  
  render() {
    return (
      <div>
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
      </div>
    );
  }
}
