import React, { Component } from 'react';
// import Pusher from 'pusher-js';
// import axios from 'axios';
// import Stall from './Stall';
import EnterStall from './EnterStall';

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.in_line = props.in_line
    this.handleEnterStallClick = this.handleEnterStallClick.bind(this);
  }

  handleEnterStallClick(e) {
    this.props.onEnterStall(e);
  }

  render() {
    return (
      <div id="waiting">
        <h2>Waiting Room</h2>
        In line: {this.in_line}<br/>
        <EnterStall onClick={this.handleEnterStallClick} />
      </div>
    );
  }

}

export default WaitingRoom;