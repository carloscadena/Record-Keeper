'use strict';
import React, {Component} from 'react';

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <MenuExample items={ ['CF', 'Goole', 'Microsoft'] } />
        <Clock />
      </div>
    );
  }
}
