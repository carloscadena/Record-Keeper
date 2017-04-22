'use strict';

import React, {Component} from 'react';

export default class User extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Opponents />
        <OpponentPage />
      </div>
    );
  }
}
