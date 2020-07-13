import React, { Component } from 'react';
import axios from 'axios';
// import Pusher from 'pusher-js';

class Stall extends Component {
  constructor(props) {
    super(props);
    this.pusher = props.pusher;
    this.id = props.id;
    this.presenceChannel = null;
    this.state = {
      occupants: {count: 0},
    };
    this.max_occupancy = props.max;
    this.updateOccupants = this.updateOccupants.bind(this);
    this.countOccupants = this.countOccupants.bind(this);
  }

  componentDidMount() {
    this.presenceChannel = this.pusher.subscribe(`presence-stall-${this.id}`);
    console.log(this.presenceChannel);
    this.presenceChannel.bind('pusher:subscription_succeeded', () => {
      this.updateOccupants(this.presenceChannel.members);
      // // POST join-stall
      // axios.post('/join-stall', {
      //   userId: this.presenceChannel.members.me.id,
      //   stallId: this.id,
      //   currentOccupants: this.presenceChannel.members.count,
      //   message: 'joined stall',
      // });
      // console.log(this.presenceChannel.members.me.id + ' joined Stall');
    });
    this.presenceChannel.bind('pusher:member_added', () => {
      this.updateOccupants(this.presenceChannel.members);
    });
    this.presenceChannel.bind('pusher:member_removed', () => {
      this.updateOccupants(this.presenceChannel.members);
      console.log(`Stall.js: someone left Stall ${this.id}`);
      // POST leave-stall
      // axios.post('/join-stall', {
      //   userId: this.presenceChannel.members.me.id,
      //   stallId: this.id,
      //   currentOccupants: this.presenceChannel.members.count,
      //   message: 'joined stall',
      // });
    });
  }

  // returns true count of occupants (excluding spies)
  countOccupants(members) {
    var count = 0;
    console.log(`countOccupants() members:`);
    if (members.count > 0) {
      members.each(function (member) {
        if (!member.info.isSpy) { count++ }
      });
    }
    return count
  }

  updateOccupants(members) {
    console.log(`Stall.js updateOccupants: stall id ${this.id}, numOccupants ${members.count}`);
    this.setState({
      occupants: members,
    }, () => this.props.onOccupancyChange(this.id, this.countOccupants(members)));
  }

  render() {
    return (
      <div id="stall" class="component-box">
        <h2>Stall {this.id}</h2>
        Stall: {this.countOccupants(this.state.occupants)} / {this.max_occupancy}
      </div>
    );
  }

}

export default Stall;