'use strict';

import React, {Component} from 'react';

export default class OpponentPage extends React.Component {
  render() {
    return (
      <form>
        <input type="checkbox"id="the-checkbox">
        <label>Ely</label>
        <input type="checkbox" id="the-checkbox2">
        <label>Carlos</label>
        <button type="submit" name="button">Submit</button>
      </form>
    );
  }
}
