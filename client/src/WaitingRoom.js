import React, { Component } from 'react';
// import Pusher from 'pusher-js';
// import axios from 'axios';
// import Stall from './Stall';
import EnterStall from './EnterStall';

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.pusher = props.pusher;
    this.state = {
      visitors: props.inLine
    };
    this.handleEnterStallClick = this.handleEnterStallClick.bind(this);
  }

  handleEnterStallClick(e) {
    this.props.onEnterStall(e);
  }

  componentDidMount() {
    console.log('joined the queue for the bathroom');
    console.log('currently in line:');
    console.log(this.visitors);
  }

  render() {
    let visitorsList = [];
    if (this.state.visitors !== []) {
      this.state.visitors.each((visitor) => 
        visitorsList.push(<li key={visitor.id.toString()}>{visitor.id}</li>)
      );
    }
    return (
      <div id="waiting">
        <h2>Waiting Room</h2>
        In line: {this.state.visitors.count}<br/>
        <ul>{visitorsList}</ul>
        <EnterStall onClick={this.handleEnterStallClick} />
      </div>
    );
  }

}

export default WaitingRoom;